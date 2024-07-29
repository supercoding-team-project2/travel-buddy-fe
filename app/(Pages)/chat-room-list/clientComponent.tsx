'use client';
import React, { useEffect, useState } from 'react';
import { ChatRoomSummary } from '../../../components/Chat/ChatRoomSummary/ChatRoomSummary';
import classNames from 'classnames/bind';
import styles from './ChatRoomList.module.css';
import { Chat } from '@/components/Chat/Chat/Chat';
import axios from 'axios';

const cx = classNames.bind(styles);

export function ChatRoomListClient() {
  const [chatRoomId, setChatRoomId] = useState<number | null>();
  const [chatRooms, setChatRooms] = useState<ChatRoomSummaryProps[]>([]);

  useEffect(() => {
    // 채팅방 데이터를 백엔드에서 가져옵니다.
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatRooms`); // 백엔드의 채팅방 목록 API 엔드포인트로 수정하세요.
        setChatRooms(response.data);
      } catch (error) {
        console.log('채팅방 데이터를 불러오는 중 오류가 발생했습니다.');
        console.log(error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className={cx('ChatRoomList')}>
      <div className={cx('title')}>Chat Rooms</div>
      <div className={cx('container')}>
        <div className={cx('leftWrapper')}>
          {chatRooms.length ? (
            chatRooms.map((room) => (
              <ChatRoomSummary
                key={room.roomId}
                roomId={room.roomId}
                opponentName={room.opponentName}
                lastMessage={room.lastMessage}
                lastTime={room.lastTime}
                setChatRoomId={setChatRoomId}
              />
            ))
          ) : (
            <div className={cx('empty')}>채팅방이 존재하지 않습니다.</div>
          )}
        </div>
        <div className={cx('rightWrapper')}>{chatRoomId ? <Chat ChatRoomId={chatRoomId} /> : <></>}</div>
      </div>
    </div>
  );
}
