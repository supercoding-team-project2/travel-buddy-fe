'use client';
import React, { useState } from 'react';
import { ChatRoomSummary } from '../../../components/Chat/ChatRoomSummary/ChatRoomSummary';
import classNames from 'classnames/bind';
import styles from './ChatRoomList.module.css';
import { Chat } from '@/components/Chat/Chat/Chat';

const cx = classNames.bind(styles);

export function ChatRoomListClient() {
  const [chatIndex, setChatIndex] = useState(0);

  const chatRooms = [
    { roomId: 1, opponentName: '정민님', lastMessage: '청운님 왜 저희 두고 가셨을까여', lastTime: 'am .3 .25' },
    { roomId: 2, opponentName: '연희님', lastMessage: '제가 진짜 감자인데요.', lastTime: 'am .4 .47' },
    { roomId: 3, opponentName: '민수님', lastMessage: '손꾸락 괜찮으신가요ㅠㅜ', lastTime: 'am .4 .47' },
    { roomId: 4, opponentName: '찬호님', lastMessage: '혹시 지금 서버 열려있나요??', lastTime: 'am .4 .47' },
    {
      roomId: 5,
      opponentName: '호현님',
      lastMessage: '저희 사이트 이름 진짜 쌈뽕한거 뭐 없을까요',
      lastTime: 'am .4 .47',
    },
    { roomId: 6, opponentName: '혜영님', lastMessage: '저 사실 로그인 자신 없어요ㅋㅋ', lastTime: 'am .4 .47' },
    { roomId: 7, opponentName: '영신님', lastMessage: '승종님이 저 괴롭혀요ㅠㅜ', lastTime: 'am .4 .47' },
    { roomId: 8, opponentName: '승종님', lastMessage: '저 왕따 아닙니다. 놀리지 마세요!', lastTime: 'am .4 .47' },
    { roomId: 9, opponentName: '오기문', lastMessage: '진짜 강의대로 했는데 버그같은데여ㅠㅜ', lastTime: 'am .4 .47' },
  ];

  return (
    <div className={cx('ChatRoomList')}>
      <div className={cx('title')}>Chat Rooms</div>
      <div className={cx('container')}>
        <div className={cx('leftWrapper')}>
          {chatRooms.map((room, index) => (
            <ChatRoomSummary
              key={room.roomId}
              roomId={room.roomId}
              opponentName={room.opponentName}
              lastMessage={room.lastMessage}
              lastTime={room.lastTime}
              setChatIndex={setChatIndex}
            />
          ))}
        </div>
        <div className={cx('rightWrapper')}>
          <Chat chatIndex={chatIndex} />{' '}
        </div>
      </div>
    </div>
  );
}
