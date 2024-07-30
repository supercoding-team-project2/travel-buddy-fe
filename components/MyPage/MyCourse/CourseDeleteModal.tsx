import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import CourseDoubleDelete from './CourseDoubleDelete';
import classNames from 'classnames/bind';
import styles from './CourseDeleteModal.module.css';
import Image from 'next/image';
import exit from '@/assets/exit.png';
import axiosInstance from '@/lib/axiosInstance';

const cx = classNames.bind(styles);
interface Props {
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  getMyCourse: () => void;
  token: string | null;
}

const CourseDeleteModal: React.FC<Props> = ({ isDeleteOpen, setIsDeleteOpen, id, getMyCourse, token }) => {
  const [isDoubleDeleteOpen, setIsDoubleDeleteOpen] = useState(false);
  const [deletePostTitle, setDeletePostTitle] = useState('여행 게시글');

  //user clike the delete button & axios delete
  const clickDeleteHandler = async (id: number) => {
    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    try {
      const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        console.log('내 여행 경로 삭제 성공', response.status);
        setIsDeleteOpen(false);
        getMyCourse();
      } else if (response.status === 202) {
        setIsDoubleDeleteOpen(true);
        setDeletePostTitle(response.data.boardTitles);
      } else {
        console.log('내 여행 경로 삭제 실패', response.status);
      }
    } catch (error) {
      console.error('내 여행 경로 삭제 요청 중 에러', error);
    }
  };

  if (!isDeleteOpen) return null;

  return createPortal(
    isDoubleDeleteOpen ? (
      <CourseDoubleDelete
        id={id}
        deletePostTitle={deletePostTitle}
        isDoubleDeleteOpen={isDoubleDeleteOpen}
        setIsDoubleDeleteOpen={setIsDoubleDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        getMyCourse={getMyCourse}
        token={token}
      />
    ) : (
      <div className={cx('delete-overlays')}>
        <div className={cx('delete-modal-container')}>
          <div className={cx('delete-exit-icon')}>
            <Image src={exit} alt="exit" className={cx('exit-icon')} onClick={() => setIsDeleteOpen(false)} />
          </div>
          <div className={cx('check-deletion')}>이 여행 경로를 삭제하시겠어요?</div>
          <div className={cx('delete-buttons-container')}>
            <button className={cx('cancel-button')} onClick={() => setIsDeleteOpen(false)}>
              취소
            </button>
            <button className={cx('delete-button')} onClick={() => clickDeleteHandler(id)}>
              삭제
            </button>
          </div>
        </div>
      </div>
    ),
    document.getElementById('overlays-modal')!
  );
};

export default CourseDeleteModal;
