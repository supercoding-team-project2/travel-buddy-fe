import classNames from 'classnames/bind';
import styles from './CourseCard.module.css';

const cx = classNames.bind(styles);

export function CourseCard({ url, title }: { url: string; title: string }) {
  return (
    <div className={cx('CourseCard')}>
      <img src={url} alt="" className={cx('courseImg')} />
      <div className={cx('courseTitle')}>{title}</div>
    </div>
  );
}
