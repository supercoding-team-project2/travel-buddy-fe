import classNames from 'classnames/bind';
import styles from './CourseSummary.module.css';

const cx = classNames.bind(styles);

export function CourseSummaryUnit({ url, title }: { url: string; title: string }) {
  return (
    <div className={cx('CourseSummaryUnit')}>
      <img src={url} alt="" className={cx('courseImg')} />
      <div className={cx('courseTitle')}>{title}</div>
    </div>
  );
}
