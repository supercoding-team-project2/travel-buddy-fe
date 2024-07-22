import React from 'react';
import styles from './Message.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface MessageProps {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  currentUser: string;
  opponentProfile: string;
}

export function Message({ senderId, content, timestamp, currentUser, opponentProfile }: MessageProps) {
  const isMine = senderId === currentUser;
  return (
    <div className={cx('message', { mine: isMine })}>
      {!isMine && <img src={opponentProfile} alt="Opponent" className={cx('profile')} />}
      <div className={cx('content')}>
        <p>{content}</p>
        <span>{timestamp}</span>
      </div>
    </div>
  );
}
