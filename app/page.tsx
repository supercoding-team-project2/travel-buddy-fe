'use client';
import classNames from 'classnames/bind';
import styles from './MainPage.module.css';
import { MainSlider } from '../components/Main/MainSlider/MainSlider';
import { CourseCard } from '../components/Main/CourseCard/CourseCard';
import Link from 'next/link';

const cx = classNames.bind(styles);

export default function MainPage() {
  const sample1 = { url: '/png/hamster.png', title: 'hamster1' };
  const sample2 = { url: '/png/hamster2.png', title: 'hamster2' };
  const sample3 = { url: '/png/hemsworth.png', title: 'hemsworth' };
  const mockCourses = ['', '', '', ''];

  return (
    <div className={cx('MainPage')}>
      <MainSlider />
      <section>
        <div className={cx('topWrapper')}>
          <img src="/svg/airplane.svg" alt="" />
          <div className={cx('title')}>Popular course</div>
          <Link href={'/'} className={cx('link')}>
            View All
          </Link>
        </div>
        <div className={cx('container')}>
          {mockCourses.map(() => (
            <CourseCard url={sample1.url} title={sample1.title} />
          ))}
        </div>
      </section>
      <section>
        <div className={cx('topWrapperReverse')}>
          <Link href={'/'} className={cx('linkReverse')}>
            View All
          </Link>
          <div className={cx('titleReverse')}>Tour with a guide</div>
          <img src="/svg/airplane.svg" alt="" />
        </div>
        <div className={cx('container')}>
          {mockCourses.map(() => (
            <CourseCard url={sample2.url} title={sample2.title} />
          ))}
        </div>
      </section>
      <section>
        <div className={cx('topWrapper')}>
          <img src="/svg/airplane.svg" alt="" />
          <div className={cx('title')}>Travel together(companion)</div>
          <Link href={'/'} className={cx('link')}>
            View All
          </Link>
        </div>
        <div className={cx('container')}>
          {mockCourses.map(() => (
            <CourseCard url={sample3.url} title={sample3.title} />
          ))}
        </div>
      </section>
    </div>
  );
}
