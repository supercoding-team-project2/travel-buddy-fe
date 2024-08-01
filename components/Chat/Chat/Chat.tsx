import React, { useEffect, useState, useRef, useCallback, FormEvent } from 'react';
import SockJS from 'sockjs-client';
import { Client, CompatClient, Stomp, Message as StompMessage } from '@stomp/stompjs';
import { Message } from '../Message/Message';
import styles from './Chat.module.css';
import classNames from 'classnames/bind';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import axiosInstance from '@/lib/axiosInstance';
import { timeStamp } from 'console';

const cx = classNames.bind(styles);

interface ChatProps {
  ChatRoomId: string;
}

export function Chat({ ChatRoomId }: ChatProps) {
  const client = useRef<CompatClient | null>(null);

  const [chatHistory, setChatHistory] = useState<MessageProps[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  // const [isLoaded, setIsLoaded] = useState(false);
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

  // const getChatRoomData = async (token: string | null) => {
  //   try {
  //     const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/room/${ChatRoomId}`, {
  //       headers: {
  //         Authorization: token,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('채팅 내역 조회 성공', response);
  //     setSenderId(response.data.senderId);
  //     setOpponentId(response.data.opponentId);
  //     setOpponentName(response.data.opponentName);
  //     setOpponentProfile(response.data.opponentProfile);
  //     setChatHistory(response.data.messages);
  //   } catch (error) {
  //     console.error('채팅 내역 조회 에러', error);
  //   }
  // };

  const getChatRoomData = (token: string | null) => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/room/${ChatRoomId}`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setSenderId(response.data.senderId);
        setOpponentId(response.data.opponentId);
        setOpponentName(response.data.opponentName);
        setOpponentProfile(response.data.opponentProfile);
        console.log('----------------');
        console.log(response.data.messages);
        console.log('----------------');
        setChatHistory(response.data.messages);
        console.log('채팅 내역 조회 성공', response);
      })
      .catch((error) => {
        console.error('채팅 내역 조회 에러', error);
      });
  };

  useEffect(() => {
    token !== null && getChatRoomData(token);
  }, [token]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const connectHandler = () => {
    if (!token) return;

    client.current = Stomp.over(function () {
      return new WebSocket('wss://wanderlus.shop/ws');
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
          `/user/${ChatRoomId}/queue/messages`,
          (message) => {
            // 기존 대화 내역에 새로운 메시지 추가
            setChatHistory((prevHistory) => {
              return prevHistory ? [...prevHistory, JSON.parse(message.body)] : null;
            });
            console.log(JSON.parse(message.body));
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
    console.log('timeStamp:' + timeStamp);
    const formattedTimeStamp = formatTimestamp(timeStamp);
    console.log('formattedTimeStamp:' + formattedTimeStamp);
    const newMessage = {
      roomId: ChatRoomId,
      senderId: senderId,
      opponentId: opponentId,
      content: inputValue,
      timeStamp: formattedTimeStamp,
    };

    setChatHistory((prevHistory) => (prevHistory ? [...prevHistory, newMessage] : [newMessage]));
    setInputValue('');

    // client.current가 존재하고 연결되었다면 메시지 전송
    if (client.current && client.current.connected) {
      console.log(newMessage);
      client.current.send(
        '/publish/chat/send',
        {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        // JSON 형식으로 전송한다
        JSON.stringify(newMessage)
      );
    }
  };

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  //     setIsLoaded(true);
  //   }
  // }, [chatHistory]);

  return (
    <div className={cx('Chat')}>
      <div className={cx('messageHeader')}>
        <img src={opponentProfile} alt="" className={cx('opponentProfile')} />
        <div className={cx('opponentName')}>{opponentName}</div>
        <div className={cx('menu')}>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
        </div>
      </div>
      <div
        className={cx('messages')}
        style={{
          overflowY: 'auto',
          maxHeight: '500px',
          // visibility: isLoaded ? 'visible' : 'hidden',
        }}
      >
        {chatHistory?.map((msg, index) => (
          <Message
            key={index}
            content={msg.content}
            timestamp={msg.timeStamp}
            opponentProfile={opponentProfile}
            senderId={msg.senderId}
            currentUserId={senderId}
            opponentName={opponentName}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <form
        className={cx('messageFooter')}
        onSubmit={(e) => {
          e.preventDefault();
          sendHandler(inputValue);
        }}
      >
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
