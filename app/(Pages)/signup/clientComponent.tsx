'use client';

import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.css';
import { Alert } from '../../../components/Alert/Alert';
import axiosInstance from '@/lib/axiosInstance';

const cx = classNames.bind(styles);

const six = [1, 2, 3, 4, 5, 6];

export function SignUpClient({ phoneNum }: { phoneNum: string }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/svg/add-profile-image.svg');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [part1, setPart1] = useState<string>('');
  const [part2, setPart2] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
      setProfilePicture(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validatePassword = (password: string) => {
    const reg_pw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).{6,12}$/;
    return reg_pw.test(password);
  };

  const validateForm = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      part1.length === 6 &&
      part2.length === 1 &&
      phoneNum.trim() !== ''
    );
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [name, email, password, part1, part2, phoneNum]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError('6~12자 영문 대 소문자와 숫자를 사용하세요.');
      return;
    }

    const residentNum = part1 + part2;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('residentNum', residentNum);
    formData.append('phoneNum', phoneNum);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        console.log('Sign up successful');
        setIsSignedUp(true);
      } else {
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <>
      {isSignedUp ? (
        <Alert errorMessage="회원가입이 완료되었습니다" buttonText="Login" nextLink="/login" />
      ) : (
        <div className={cx('SignUp')}>
          <div className={cx('leftWrapper')}>
            <img src="/svg/air-balloon.svg" alt="" className={cx('airBalloon')} />
          </div>
          <div className={cx('rightWrapper')}>
            <div className={cx('title')}>Sign Up</div>
            <form className={cx('container')} onSubmit={handleSubmit}>
              <div className={cx('inputUnit')}>
                <div className={cx('inputTitle')}>Name</div>
                <input
                  className={cx('inputContent')}
                  type="text"
                  placeholder="Enter your Name here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={cx('inputUnit')}>
                <div className={cx('inputTitle')}>Email</div>
                <input
                  className={cx('inputContent')}
                  type="text"
                  placeholder="Enter your Email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  <img
                    src="/svg/eye-open.svg"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cx('showPasswordButton')}
                  />
                ) : (
                  <img
                    src="/svg/eye-close.svg"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cx('showPasswordButton')}
                  />
                )}
              </div>
              {error && <div className={cx('checkError')}>{error}</div>}
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
                  {six.map((index) => (
                    <div key={index} className={cx('passwordDot')}></div>
                  ))}
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
                <button className={cx('submitButton')} type="submit" disabled={!isFormValid}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
