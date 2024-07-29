import React, { useEffect, useState, useRef, useCallback, FormEvent } from 'react';
import SockJS from 'sockjs-client';
import { Client, CompatClient, Stomp, Message as StompMessage } from '@stomp/stompjs';
import { Message } from '../Message/Message';
import styles from './Chat.module.css';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

interface ChatProps {
  ChatRoomId: number;
}

interface MessageProps {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

export function Chat({ ChatRoomId }: ChatProps) {
  const token = localStorage.getItem('token');
  const client = useRef<CompatClient | null>(null);

  const [chatHistory, setChatHistory] = useState<MessageProps[] | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getChatHistory = async (token: string | null) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/room/history/${ChatRoomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.messageHistory;
    } catch (error) {
      console.error('채팅 내역 조회 에러', error);
    }
  };

  const connectHandler = () => {
    // SockJS 클라이언트 객체를 생성, 웹 소켓을 연결
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws`);

    // SockJS 클라이언트 객체 socket를 STOMP 프로토콜로 오버랩하여 client.current에 할당
    client.current = Stomp.over(socket);
    // 클라이언트 객체를 서버와 연결
    client.current.connect(
      {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      () => {
        // 연결 성공 시 해당 방을 구독하면 서버로부터 새로운 매시지를 수신 한다.
        client.current?.subscribe(
          `/sub/chat/room/${ChatRoomId}`,
          (message) => {
            // 기존 대화 내역에 새로운 메시지 추가
            setChatHistory((prevHistory) => {
              return prevHistory ? [...prevHistory, JSON.parse(message.body)] : null;
            });
          },
          {
            Authorization: 'Bearer ' + token,
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
    // client.current가 존재하고 연결되었다면 메시지 전송
    if (client.current && client.current.connected) {
      client.current.send(
        '/pub/chat/message',
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        // JSON 형식으로 전송한다
        JSON.stringify({
          type: 'TALK',
          roomId: ChatRoomId,
          message: inputValue,
        })
      );
    }
  };

  useEffect(() => {
    sendHandler(inputValue);
  }, [inputValue]);

  return (
    <div className="Chat">
      <div className="messageHeader"></div>
      <div className="messages">
        {chatHistory?.map((message) => (
          <Message senderId={''} recipientId={''} content={''} timestamp={''} currentUser={''} opponentProfile={''} />
        ))}
      </div>
    </div>
  );
}
