import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { Message } from '../../../components/Chat/Message/Message';
import styles from './Chat.module.css';
import classNames from 'classnames/bind';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

const cx = classNames.bind(styles);
const socket = io('/api/socket');

const mockChatData = [
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: true, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
  { isMine: false, content: 'content', timestamp: 'time' },
];

export function Chat({ chatIndex }: { chatIndex: number }) {
  const [messages, setMessages] = useState(mockChatData);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMoreMessages = useCallback(() => {
    const newMessages = [
      { isMine: false, content: 'new content', timestamp: 'new time' },
      { isMine: true, content: 'new content', timestamp: 'new time' },
    ];
    setMessages((prevMessages) => [...newMessages, ...prevMessages]);
  }, []);

  const { scrollRef, isFetching, setIsFetching } = useInfiniteScroll(loadMoreMessages);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      setIsLoaded(true);
    }
  }, [messages]);

  const sendMessage = () => {
    const message = {
      isMine: true,
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    socket.emit('message', message);
    setInput('');
  };

  return (
    <div className={cx('Chat')}>
      <div className={cx('messageHeader')}>
        <img src="/png/hamster2.png" alt="" className={cx('opponentProfile')} />
        <div className={cx('opponentName')}>Hamster{chatIndex}</div>
        <div className={cx('menu')}>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
        </div>
      </div>
      <div
        className={cx('messages')}
        ref={scrollRef} // useInfiniteScroll의 scrollRef 설정
        style={{ overflowY: 'auto', maxHeight: '500px', visibility: isLoaded ? 'visible' : 'hidden' }}
      >
        {messages.map((msg, index) => (
          <Message
            key={index}
            isMine={msg.isMine}
            content={msg.content}
            timestamp={msg.timestamp}
            opponentProfile="/png/hamster2.png"
          />
        ))}
        <div ref={messagesEndRef}></div> {/* 메시지 끝 참조 */}
      </div>
      <div className={cx('messageFooter')}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
