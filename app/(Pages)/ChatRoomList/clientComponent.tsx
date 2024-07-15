import React from 'react';
import { ChatRoomSummary } from '../../../components/Chat/ChatRoomSummary/ChatRoomSummary';
import classNames from 'classnames/bind';
import styles from './ChatRoomList.module.css';

const cx = classNames.bind(styles);

export function ChatRoomListClient() {
  const chatRooms = [
    {
      opponentName: '정민님',
      lastMessage: '지능정보사회에서 노인층의 디지털 정보격차는 어떻게 해소될 수 있을까요?',
      lastTime: 'pm .3 .25',
    },
    { opponentName: '연희님', lastMessage: '수고하셨습니다.', lastTime: 'am .4 .47' },
  ];

  return (
    <div className={cx('ChatRoomList')}>
      <div className={cx('title')}>Chat Rooms</div>
      {chatRooms.map((room, index) => (
        <ChatRoomSummary
          key={index}
          opponentName={room.opponentName}
          lastMessage={room.lastMessage}
          lastTime={room.lastTime}
        />
      ))}
    </div>
  );
}
