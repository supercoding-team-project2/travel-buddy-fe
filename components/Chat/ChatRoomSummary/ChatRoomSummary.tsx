import classNames from 'classnames/bind';
import styles from './ChatRoomSummary.module.css';

const cx = classNames.bind(styles);

export function ChatRoomSummary({ roomId, opponentName, lastMessage, lastTime, setChatIndex }: ChatRoomSummaryProps) {
  return (
    <div className={cx('ChatRoomSummary')} onClick={() => setChatIndex(roomId)}>
      <div className={cx('opponentName')}>{opponentName}</div>
      <div className={cx('bottomWrapper')}>
        <div className={cx('lastMessage')}>{lastMessage}</div>
        <div className={cx('lastTime')}>{lastTime}</div>
      </div>
    </div>
  );
}
