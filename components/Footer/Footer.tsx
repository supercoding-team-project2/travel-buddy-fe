'use client';
import classNames from 'classnames/bind';
import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { noLayoutRoutes } from '@/lib/constants';
import { useRouter, usePathname } from 'next/navigation';

const cx = classNames.bind(styles);

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const noLayout = noLayoutRoutes.some((route) => new RegExp(`^${route}(/|$)`).test(pathname));
  if (noLayout) return <></>;

  return (
    <>
      <div className={cx('Footer')}>
        <div className={cx('Footer-name-container')}>
          <div className={cx('Footer-name')}>Travel Buddy</div>
          <div className={cx('Footer-github')}>
            <a
              href="https://github.com/supercoding-team-project2/travel-buddy-fe"
              target="_blank"
              rel="noopener noreferrer"
              className={cx('Footer-github')}
            >
              <Image src="/svg/github.svg" alt="GitHub Logo" width={30} height={30} />
            </a>
          </div>
          <div className={cx('copyright')}>© Copyright 2024. All Rights Reserved.</div>
        </div>

        <div className={cx('Footer-link-container')}>
          <div className={cx('link-home')} onClick={() => router.push('/')}>
            Home
          </div>
          <div className={cx('link-review')} onClick={() => router.push('/post-view?category=REVIEW')}>
            여행 후기
          </div>
          <div className={cx('link-guide')} onClick={() => router.push('/post-view?category=GUIDE')}>
            가이드 여행
          </div>
          <div className={cx('link-companion')} onClick={() => router.push('/post-view?category=COMPANION')}>
            동행자 여행
          </div>
        </div>
      </div>
    </>
  );
}
