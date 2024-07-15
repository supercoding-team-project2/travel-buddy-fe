import classNames from 'classnames/bind';
import styles from './Message.module.css';

const cx = classNames.bind(styles);

export function Message({ isMine, content, timestamp, opponentProfile }: MessageProps & { opponentProfile: string }) {
  return (
    <div className={cx(isMine ? 'myMessage' : 'message')}>
      <img src={opponentProfile} alt="" />
      <div className={cx('content')}>{content}</div>
      <div className={cx('timestamp')}>{timestamp}</div>
    </div>
  );
}
