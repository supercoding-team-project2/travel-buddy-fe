import classNames from 'classnames/bind';
import styles from './ChatRoomSummary.module.css';

const cx = classNames.bind(styles);

export function ChatRoomSummary({ roomId, opponentName, setChatRoomId }: ChatRoomSummaryProps) {
  return (
    <div className={cx('ChatRoomSummary')} onClick={() => setChatRoomId(roomId)}>
      <div className={cx('opponentName')}>{opponentName}</div>
    </div>
  );
}
