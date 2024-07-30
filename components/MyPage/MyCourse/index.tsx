import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './MyCourse.module.css';

import Image from 'next/image';
import upArrow from '@/assets/up-arrow.png';

import EachCourse from './EachCourse';
import EmptyMyCourse from './EmptyMyCourse';
import Loading from '@/components/Loading';

import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';

const cx = classNames.bind(styles);

interface Props {
  token: string | null;
}

const MyCourse = ({ token }: Props) => {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);
  const [isUparrowVisible, setIsUparrowVisible] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  //테스트 데이터 배열
  const [courseData, setCourseData] = useState([]);

  const getMyCourse = () => {
    if (token) {
      axiosInstance
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/list`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log('경로 조회 데이터', response.data);
          setCourseData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('경로 조회 요청 실패', error);
        });
    }
  };

  //경로 조회 axios get 요청
  useEffect(() => {
    setIsButtonLoading(false);
    getMyCourse();

    //Top arrow
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsUparrowVisible(true);
      } else {
        setIsUparrowVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    setIsButtonLoading(true);
    router.push('/course');
  };

  const clickEachCourseHandler = (id: number) => {
    setOpenId(id === openId ? null : id);

    if (editingCourseId !== id) {
      setEditingCourseId(null);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && courseData.length === 0 ? (
        <EmptyMyCourse />
      ) : (
        <main className={cx('my-course-container')}>
          {isUparrowVisible && (
            <div className={cx('upArrow-container')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Image src={upArrow} alt="up-arrow" className={cx('upArrow-icon')} />
            </div>
          )}
          {!isLoading && (
            <div className={cx('course-button-container')}>
              <button className={cx('course-button')} onClick={handleButtonClick}>
                {isButtonLoading ? (
                  <img
                    src="/gif/loading-1.gif"
                    alt="Loading..."
                    width={25}
                    height={25}
                    className={cx('loading-icon')}
                  />
                ) : (
                  <div>내 경로 생성하기</div>
                )}
              </button>
            </div>
          )}
          <div className={cx('courses-container')}>
            {courseData.map((element: any, index: number) => (
              <EachCourse
                key={element.routeId}
                id={element.routeId}
                title={element.title}
                description={element.description}
                startAt={element.startAt}
                endAt={element.endAt}
                createdAt={element.createdAt}
                days={element.days}
                isCourseOpen={element.routeId === openId}
                clickEachHandler={() => clickEachCourseHandler(element.routeId)}
                getMyCourse={getMyCourse}
                editingCourseId={editingCourseId}
                setEditingCourseId={setEditingCourseId}
                setOpenId={setOpenId}
                token={token}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default MyCourse;
