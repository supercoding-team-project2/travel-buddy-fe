import classNames from 'classnames/bind';
import styles from './Header.module.css';

const cx = classNames.bind(styles);

export function Header() {
  return (
    <>
      <div className={cx('Header')}>Header</div>
    </>
  );
}
