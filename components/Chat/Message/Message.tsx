import React from 'react';
import styles from './Message.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface MessageProps {
  senderId: string;
  content: string;
  timestamp: string;
  currentUserId: string;
  opponentProfile: string;
  opponentName: string;
}

export function Message({ senderId, content, timestamp, currentUserId, opponentProfile, opponentName }: MessageProps) {
  const isMine = senderId === currentUserId;
  return (
    <div className={cx(isMine ? 'myMessage' : 'message')}>
      {!isMine && (
        <div className={cx('topWrapper')}>
          <img src={opponentProfile} alt="Opponent" className={cx('profile')} />
          <div className={cx('name')}>{opponentName}</div>
        </div>
      )}
      <div className={cx('bottomWrapper')}>
        <div className={cx('content')}>{content}</div>
        <div className={cx('timestamp')}>{timestamp}</div>
      </div>
    </div>
  );
}
