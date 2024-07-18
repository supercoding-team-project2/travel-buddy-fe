'use client';
import classNames from 'classnames/bind';
import styles from './SignUp.module.css';
import { useRef, useState } from 'react';
import Link from 'next/link';

const cx = classNames.bind(styles);

export function SignUpClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/svg/add-profile-image.svg');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');

  const handlePart1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPart1(value);
      if (value.length === 6) {
        (document.getElementById('part2') as HTMLInputElement).focus();
      }
    }
  };

  const handlePart2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      setPart2(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[\d\b]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  };

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cx('SignUp')}>
      <div className={cx('leftWrapper')}>
        <img src="/svg/air-balloon.svg" alt="" className={cx('airBalloon')} />
      </div>
      <div className={cx('rightWrapper')}>
        <div className={cx('title')}>Sign Up</div>
        <form className={cx('container')}>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Name</div>
            <input className={cx('inputContent')} type="text" placeholder="Enter your Name here" />
          </div>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Email</div>
            <input className={cx('inputContent')} type="text" placeholder="Enter your Email here" />
          </div>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Password</div>
            <input
              className={cx('inputContent')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your Password here"
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <img src="/svg/eye-open.svg" onClick={togglePasswordVisibility} className={cx('showPasswordButton')} />
            ) : (
              <img src="/svg/eye-close.svg" onClick={togglePasswordVisibility} className={cx('showPasswordButton')} />
            )}
          </div>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>주민등록번호</div>
            <div className={cx('idNumInput')}>
              <input
                type="text"
                className={cx('inputContent', 'part1')}
                value={part1}
                onChange={handlePart1Change}
                onKeyDown={handleKeyDown}
                maxLength={6}
              />
              -
              <input
                type="text"
                id="part2"
                className={cx('inputContent', 'part2')}
                value={part2}
                onChange={handlePart2Change}
                onKeyDown={handleKeyDown}
                maxLength={1}
              />
            </div>
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
          <div className={cx('bottomWrapper')}>
            <button className={cx('submitButton')} type="submit">
              Sign Up
            </button>
            <div className={cx('text')}>이미 계정이 있으세요?</div>
            <Link href={'/login'}>로그인하기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
