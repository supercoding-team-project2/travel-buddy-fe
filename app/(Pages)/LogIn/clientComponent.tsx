'use client';

import classNames from 'classnames/bind';
import styles from './LogIn.module.css';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

export function LogInClient() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/login', { email, password });
      const token = response.data.token;

      sessionStorage.setItem('token', token);
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className={cx('LogIn')}>
      <div className={cx('leftWrapper')}>
        <img src="/svg/air-balloon.svg" alt="" className={cx('airBalloon')} />
      </div>
      <div className={cx('rightWrapper')}>
        <div className={cx('title')}>Login</div>
        <div className={cx('container')}>
          <form className={cx('formContainer')} onSubmit={handleSubmit}>
            <div className={cx('inputUnit')}>
              <div className={cx('inputTitle')}>Email</div>
              <input
                className={cx('inputContent')}
                type="text"
                placeholder="Enter your Email here"
                value={email}
                onChange={handleEmailChange}
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
                <img src="/svg/eye-open.svg" onClick={togglePasswordVisibility} className={cx('showPasswordButton')} />
              ) : (
                <img src="/svg/eye-close.svg" onClick={togglePasswordVisibility} className={cx('showPasswordButton')} />
              )}
            </div>
            <button className={cx('submitButton')}>Login</button>
            {error && <div className={cx('error')}>{error}</div>}
          </form>
          <div className={cx('middleWrapper')}>
            <div className={cx('text')}>
              아직 회원이 아니세요? <Link href={'/signup'}>이메일 회원가입</Link>
            </div>
            <hr className={cx('line')} />
            <div className={cx('text')}>소셜 계정으로 로그인 하기</div>
          </div>
          <div className={cx('socialWrapper')}>
            <img src="/png/kakao-login.png" alt="" />
            <img src="/png/naver-login.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
