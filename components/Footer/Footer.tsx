import classNames from 'classnames/bind';
import styles from './Footer.module.css';

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <>
      <div className={cx('Footer')}>Footer</div>
    </>
  );
}
