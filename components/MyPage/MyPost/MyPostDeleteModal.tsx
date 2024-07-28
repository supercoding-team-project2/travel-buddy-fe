import React from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';

import classNames from 'classnames/bind';
import styles from './MyPostDeleteModal.module.css';

import Image from 'next/image';
import exit from '@/assets/exit.png';

const cx = classNames.bind(styles);
interface Props {
  id: number;
  category: string;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPostData: (category: string) => void;
}

const MyPostDeleteModal = ({ id, category, isDeleteModalOpen, setIsDeleteModalOpen, fetchPostData }: Props) => {
  //게시글 axios delete 요청 & url에 id 넣어서 요청보내기
  const handleDelete = (id: number) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/boards/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
<<<<<<< HEAD
        console.log('해당 게시글 삭제 성공', response.data.message);
=======
        console.log("해당 게시글 삭제 성공", response.data);
>>>>>>> develop
        setIsDeleteModalOpen(false);
        fetchPostData(category);
      })
      .catch((error) => {
        console.error('해당 게시글 삭제 요청 실패', error);
      });
  };

  if (!isDeleteModalOpen) return null;

  return createPortal(
    <div className={cx('delete-overlays')}>
      <div className={cx('delete-modal-container')}>
        <div className={cx('delete-exit-icon')}>
          <Image src={exit} alt="exit" className={cx('exit-icon')} onClick={() => setIsDeleteModalOpen(false)} />
        </div>
        <div className={cx('check-deletion')}>이 게시글을 삭제하시겠어요?</div>
        <div className={cx('delete-buttons-container')}>
          <button className={cx('cancel-button')} onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </button>
          <button className={cx('delete-button')} onClick={() => handleDelete(id)}>
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('overlays-modal')!
  );
};

export default MyPostDeleteModal;
