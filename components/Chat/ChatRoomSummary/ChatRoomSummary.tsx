import classNames from 'classnames/bind';
import styles from './ChatRoomSummary.module.css';

const cx = classNames.bind(styles);

export function ChatRoomSummary({ roomId, opponentName, status, setChatRoomId }: ChatRoomSummaryProps) {
  return (
    <div className={cx('ChatRoomSummary')} onClick={() => setChatRoomId(roomId)}>
      <div className={cx('opponentName')}>{opponentName}</div>
      <div className={cx('online')}>현재 활동 중</div>
    </div>
  );
}
