'use client';
import classNames from 'classnames/bind';
import styles from './SignUp.module.css';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

export function SignUpClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/svg/add-profile-image.svg');

  const handleImageClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cx('SignUp')}>
      <div className={cx('title')}>회원가입</div>
      <form className={cx('container')}>
        <div className={cx('inputUnit')}>
          <div className={cx('inputTitle')}>Name</div>
          <input className={cx('inputContent')} type="text"></input>
        </div>
        <div className={cx('inputUnit')}>
          <div className={cx('inputTitle')}>Email</div>
          <input className={cx('inputContent')} type="text"></input>
        </div>
        <div className={cx('inputUnit')}>
          <div className={cx('inputTitle')}>Password</div>
          <input className={cx('inputContent')} type="password"></input>
        </div>
        <div className={cx('inputUnit')}>
          <div className={cx('inputTitle')}>주민등록번호</div>
          <input className={cx('inputContent')} type="text"></input>
        </div>
        <div className={cx('inputUnit')}>
          <div className={cx('inputTitle')}>프로필 사진</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <input
            className={cx('inputImageContent')}
            type="image"
            src={imageSrc}
            alt="Upload Image"
            onClick={handleImageClick}
          />
        </div>
        <button className={cx('submitButton')}>Sign Up</button>
      </form>
    </div>
  );
}
