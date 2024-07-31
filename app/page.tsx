'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './MainPage.module.css';
import { MainSlider } from '../components/Main/MainSlider/MainSlider';
import { CourseCard } from '../components/Main/CourseCard/CourseCard';
import axiosInstance from '@/lib/axiosInstance';

import SuccessSignUp from "../components/SuccessSignUp";

const cx = classNames.bind(styles);

interface Post {
  id: number;
  author: string;
  createdAt: string;
  title: string;
  likeCount: number;
  representativeImage: string;
}

interface ApiResponse {
  top4ReviewBoards: Post[];
  top4GuideBoards: Post[];
  top4CompanionBoards: Post[];
}

export default function MainPage() {
  const sample1 = '/png/hamster.png';
  const sample2 = '/png/hamster2.png';
  const sample3 = '/png/hemsworth.png';
  const [topReviewData, settopReviewData] = useState<Post[]>([]);
  const [topGuideData, setTopGuideData] = useState<Post[]>([]);
  const [topCompanionData, setTopCompanionData] = useState<Post[]>([]);

  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/boards/top4-categories`)
      .then((response) => {
        console.log('메인 페이지 top 게시글 패치 성공', response.data);
        const data: ApiResponse = response.data;
        settopReviewData(data.top4ReviewBoards);
        setTopGuideData(data.top4GuideBoards);
        setTopCompanionData(data.top4CompanionBoards);
      })
      .catch((error) => console.error('메인 페이지 게시글 패치 실패', error));
  }, []);

  return (
    <div className={cx('MainPage')}>
      <MainSlider />
      <section>
        <div className={cx('wrapper')}>
          <div className={cx('title')}>인기있는 여행 후기</div>
        </div>
        <div className={cx('container')}>
          {topReviewData.map((review) => (
            <CourseCard
              key={review.id}
              id={review.id}
              author={review.author}
              date={review.createdAt}
              title={review.title}
              likes={review.likeCount}
              // url={review.representativeImage}
              url={sample1}
            />
          ))}
        </div>
        <div className={cx('read-more-container')}>
          <div className={cx('read-more')} onClick={() => router.push('/post-view?category=REVIEW')}>
            Read More
          </div>
        </div>
      </section>
      <section>
        <div className={cx('wrapper')}>
          <div className={cx('title')}>가이드와 함께하는 패키지 여행</div>
        </div>
        <div className={cx('container')}>
          {topGuideData.map((guide) => (
            <CourseCard
              key={guide.id}
              id={guide.id}
              author={guide.author}
              date={guide.createdAt}
              title={guide.title}
              likes={guide.likeCount}
              // url={guide.representativeImage}
              url={sample2}
            />
          ))}
        </div>
        <div className={cx('read-more-container')}>
          <div className={cx('read-more')} onClick={() => router.push('/post-view?category=GUIDE')}>
            Read More
          </div>
        </div>
      </section>
      <section>
        <div className={cx('wrapper')}>
          <div className={cx('title')}>함께하는 동행 여행</div>
        </div>
        <div className={cx('container')}>
          {topCompanionData.map((companion) => (
            <CourseCard
              key={companion.id}
              id={companion.id}
              author={companion.author}
              date={companion.createdAt}
              title={companion.title}
              likes={companion.likeCount}
              // url={companion.representativeImage}
              url={sample3}
            />
          ))}
        </div>
        <div className={cx('read-more-container')}>
          <div className={cx('read-more')} onClick={() => router.push('/post-view?category=COMPANION')}>
            Read More
          </div>
        </div>
      </section>
    </div>
    // <SuccessSignUp />
  );
}
