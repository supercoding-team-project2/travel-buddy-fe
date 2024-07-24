import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './Alert.module.css';

const cx = classNames.bind(styles);

export function Alert({ errorMessage, buttonText, nextLink }: ErrorProps) {
  return (
    <div className={cx('Alert')}>
      <div className={cx('alertMessage')}>{errorMessage}</div>
      <Link href={nextLink}>{buttonText}</Link>
    </div>
  );
}
