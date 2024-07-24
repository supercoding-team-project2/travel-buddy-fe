import React, { useEffect, useState, useRef, useCallback, FormEvent } from 'react';
import SockJS from 'sockjs-client';
import { Client, Message as StompMessage } from '@stomp/stompjs';
import { Message } from '../Message/Message';
import styles from './Chat.module.css';
import classNames from 'classnames/bind';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

const cx = classNames.bind(styles);

interface ChatProps {
  nickname: string;
  fullname: string;
}

interface MessageProps {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

export function Chat({ nickname, fullname }: ChatProps) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stompClient = useRef<Client | null>(null);

  const loadMoreMessages = useCallback(() => {
    const newMessages = [
      { senderId: 'server', recipientId: nickname, content: 'new content', timestamp: 'new time' },
      { senderId: nickname, recipientId: 'server', content: 'new content', timestamp: 'new time' },
    ];
    setMessages((prevMessages) => [...newMessages, ...prevMessages]);
  }, [nickname]);

  const { scrollRef, isFetching, setIsFetching } = useInfiniteScroll(loadMoreMessages);

  useEffect(() => {
    const socket = new SockJS('/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      },
      onConnect: onConnected,
      onDisconnect: () => {
        console.log('Disconnected');
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
      },
    });
    stompClient.current.activate();

    return () => {
      stompClient.current?.deactivate();
    };
  }, []);

  const onConnected = () => {
    if (stompClient.current) {
      stompClient.current.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
      stompClient.current.subscribe(`/user/public`, onMessageReceived);

      stompClient.current.publish({
        destination: '/app/user.addUser',
        body: JSON.stringify({
          nickName: nickname,
          fullName: fullname,
          status: 'ONLINE',
        }),
      });
      findAndDisplayConnectedUsers();
    }
  };

  const onMessageReceived = (message: StompMessage) => {
    findAndDisplayConnectedUsers();
    const payload = JSON.parse(message.body);
    const msg: MessageProps = payload;
    if (selectedUserId === msg.senderId || selectedUserId === msg.recipientId) {
      setMessages((prevMessages) => [...prevMessages, msg]);
    }
  };

  const findAndDisplayConnectedUsers = async () => {
    const response = await fetch('/users');
    let users = await response.json();
    users = users.filter((user: any) => user.nickName !== nickname);
    setConnectedUsers(users);
  };

  const fetchAndDisplayUserChat = async (userId: string) => {
    const response = await fetch(`/messages/${nickname}/${userId}`);
    const userChat: MessageProps[] = await response.json();
    setMessages(userChat);
  };

  const handleUserItemClick = (userId: string) => {
    setSelectedUserId(userId);
    fetchAndDisplayUserChat(userId);
  };

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (input.trim() && stompClient.current) {
      const chatMessage: MessageProps = {
        senderId: nickname,
        recipientId: selectedUserId!,
        content: input.trim(),
        timestamp: new Date().toISOString(),
      };
      stompClient.current.publish({
        destination: '/publish/chat/enter',
        body: JSON.stringify(chatMessage),
      });
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setInput('');
    }
  };

  const handleLogout = () => {
    if (stompClient.current) {
      stompClient.current.publish({
        destination: '/app/user.disconnectUser',
        body: JSON.stringify({
          nickName: nickname,
          fullName: fullname,
          status: 'OFFLINE',
        }),
      });
    }
    window.location.reload();
  };

  return (
    <div className={cx('Chat')}>
      <div className={cx('messageHeader')}>
        <img src="/png/hamster2.png" alt="" className={cx('opponentProfile')} />
        <div className={cx('opponentName')}>Hamster</div>
        <div className={cx('menu')}>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
        </div>
      </div>
      <div
        className={cx('messages')}
        ref={scrollRef}
        style={{ overflowY: 'auto', maxHeight: '500px', visibility: isLoaded ? 'visible' : 'hidden' }}
      >
        {messages.map((msg, index) => (
          <Message
            key={index}
            senderId={msg.senderId}
            recipientId={msg.recipientId}
            content={msg.content}
            timestamp={msg.timestamp}
            currentUser={nickname}
            opponentProfile="/png/hamster2.png"
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className={cx('messageFooter')}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
