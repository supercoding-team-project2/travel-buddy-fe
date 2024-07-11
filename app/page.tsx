import classNames from 'classnames/bind';
import styles from './MainPage.module.css';
import { MainSlider } from '../components/Main/MainSlider/MainSlider';
import { CourseSummaryUnit } from '../components/Main/CourseSummaryUnit';
import Link from 'next/link';

const cx = classNames.bind(styles);

export default function MainPage() {
  const sample1 = { url: '/png/hamster.png', title: 'hamster1' };
  const sample2 = { url: '/png/hamster2.png', title: 'hamster2' };
  const sample3 = { url: '/png/hemsworth.png', title: 'hemsworth' };
  const mockCourses = [sample1, sample1, sample1, sample1, sample1, sample1];

  return (
    <div className={cx('MainPage')}>
      <MainSlider />
      <section>
        <div className={cx('title')}>인기있는 코스</div>
        <div className={cx('container')}>
          <Link href={'/'} className={cx('link')}>
            더보기
          </Link>
          {mockCourses.map(() => (
            <CourseSummaryUnit url={sample1.url} title={sample1.title} />
          ))}
        </div>
      </section>
      <section>
        <div className={cx('title')}>가이드와 함께하는 패키지 여행!</div>
        <div className={cx('container')}>
          <Link href={'/'} className={cx('link')}>
            더보기
          </Link>
          {mockCourses.map(() => (
            <CourseSummaryUnit url={sample2.url} title={sample2.title} />
          ))}
        </div>
      </section>
      <section>
        <div className={cx('title')}>함께 하는 여행(동행자)</div>
        <div className={cx('container')}>
          <Link href={'/'} className={cx('link')}>
            더보기
          </Link>
          {mockCourses.map(() => (
            <CourseSummaryUnit url={sample3.url} title={sample3.title} />
          ))}
        </div>
      </section>
    </div>
  );
}
