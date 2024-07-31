import React, { useEffect, useState, useRef, useCallback, FormEvent } from 'react';
import SockJS from 'sockjs-client';
import { Client, CompatClient, Stomp, Message as StompMessage } from '@stomp/stompjs';
import { Message } from '../Message/Message';
import styles from './Chat.module.css';
import classNames from 'classnames/bind';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import axiosInstance from '@/lib/axiosInstance';

const cx = classNames.bind(styles);

interface ChatProps {
  ChatRoomId: string;
}

export function Chat({ ChatRoomId }: ChatProps) {
  const client = useRef<CompatClient | null>(null);

  const [chatHistory, setChatHistory] = useState<MessageProps[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [senderId, setSenderId] = useState('');
  const [opponentId, setOpponentId] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [opponentProfile, setOpponentProfile] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const getChatRoomData = async (token: string | null) => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/room/${ChatRoomId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSenderId(response.data.senderId);
      setOpponentId(response.data.opponentId);
      setOpponentName(response.data.opponentName);
      setOpponentProfile(response.data.opponentProfile);
      setChatHistory(response.data.messages);
    } catch (error) {
      console.error('채팅 내역 조회 에러', error);
    }
  };

  useEffect(() => {
    getChatRoomData(token);
  }, []);

  // const loadMoreMessages = useCallback(() => {
  //   const newMessages = [
  //     { roomId: ChatRoomId, senderId: senderId, content: 'new content', timestamp: '4 : 47' },
  //     { roomId: ChatRoomId, senderId: opponentId, content: 'new content', timestamp: '4 : 47' },
  //   ];

  //   setChatHistory((prevChatHistory) => (prevChatHistory ? [...newMessages, ...prevChatHistory] : []));
  // }, []);

  // const { scrollRef, isFetching, setIsFetching } = useInfiniteScroll(loadMoreMessages);

  const connectHandler = () => {
    if (!token) return;

    client.current = Stomp.over(function () {
      return new WebSocket('ws://localhost:8080/ws');
    });

    // 클라이언트 객체를 서버와 연결
    client.current.connect(
      {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      () => {
        // 연결 성공 시 해당 방을 구독하면 서버로부터 새로운 매시지를 수신 한다.
        client.current?.subscribe(
          `/subscribe/${ChatRoomId}/queue/messages/`,
          (message) => {
            // 기존 대화 내역에 새로운 메시지 추가
            setChatHistory((prevHistory) => {
              return prevHistory ? [...prevHistory, JSON.parse(message.body)] : null;
            });
          },
          {
            Authorization: token,
            'Content-Type': 'application/json',
          }
        );
      }
    );
  };

  useEffect(() => {
    connectHandler();
  }, [token, ChatRoomId]);

  const sendHandler = (inputValue: string) => {
    console.log('메시지 보냄');
    const timeStamp = new Date().toISOString();
    // client.current가 존재하고 연결되었다면 메시지 전송
    if (client.current && client.current.connected) {
      client.current.send(
        '/publish/chat/send',
        {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        // JSON 형식으로 전송한다
        JSON.stringify({
          chatId: ChatRoomId,
          senderId: senderId,
          opponentId: opponentId,
          content: inputValue,
          timeStamp: timeStamp,
        })
      );
    }
  };

  // useEffect(() => {
  //   sendHandler(inputValue);
  // }, [inputValue]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      setIsLoaded(true);
    }
  }, [chatHistory]);

  return (
    <div className={cx('Chat')}>
      <div className={cx('messageHeader')}>
        <img src="/png/hamster2.png" alt="" className={cx('opponentProfile')} />
        <div className={cx('opponentName')}>Hamster{ChatRoomId}</div>
        <div className={cx('menu')}>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
        </div>
      </div>
      <div
        className={cx('messages')}
        // ref={scrollRef}
        style={{ overflowY: 'auto', maxHeight: '500px', visibility: isLoaded ? 'visible' : 'hidden' }}
      >
        {chatHistory?.map((msg, index) => (
          <Message
            key={index}
            content={msg.content}
            timestamp={msg.timestamp}
            opponentProfile={opponentProfile}
            senderId={msg.senderId}
            currentUserId={senderId}
            opponentName={opponentName}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className={cx('messageFooter')}>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type a message" />
        <button onClick={() => sendHandler(inputValue)}>Send</button>
      </div>
    </div>
  );
}
