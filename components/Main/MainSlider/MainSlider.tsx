'use client';
import classNames from 'classnames/bind';
import styles from './MainSlider.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const cx = classNames.bind(styles);

const images = ['/png/travel1.png', '/png/travel3.png', '/png/travel4.png', '/png/travel9.png'];

export function MainSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cx('background')} style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      <div className={cx('content')}>
        <div className={cx('text')}>
          나만의 여행 이야기, <br />
          함께 만드는 특별한 여정
        </div>
        {/* <Link className={cx('createCourse')} href={'/'}>
          여행지 짜기
        </Link> */}
      </div>
    </div>
  );
}
