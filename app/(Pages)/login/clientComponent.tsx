'use client';

import classNames from 'classnames/bind';
import styles from './LogIn.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';

const cx = classNames.bind(styles);

export function LogInClient() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/');
      }
    }
  }, [router]);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/authorize`;
    window.location.href = kakaoAuthUrl;
  };

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
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log('Log In successful');
        const token = response.headers.authorization;
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        console.error('Log In failed');
      }
    } catch (error) {
      console.log(error);
      console.log('Log In failed.');
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
              <img
                src={showPassword ? '/svg/eye-open.svg' : '/svg/eye-close.svg'}
                onClick={togglePasswordVisibility}
                className={cx('showPasswordButton')}
              />
            </div>
            <button className={cx('submitButton')}>로그인</button>
          </form>
          <div className={cx('middleWrapper')}>
            <div className={cx('signup-forgot-container')}>
              <div className={cx('text-signup')}>
                <Link href={'/signup'}>이메일 회원가입</Link>
              </div>
              <div className={cx('middle-line')}></div>
              <div className={cx('text-password-container')}>
                <div className={cx('forgot-password')} onClick={() => router.push('/change-password')}>
                  Forgot Password?
                </div>
              </div>
            </div>
            {/* <hr className={cx("line")} /> */}
            <div className={cx('text')}>소셜 계정으로 로그인 하기</div>
          </div>
          <img className={cx('social')} src="/png/kakao-login.png" alt="" onClick={handleKakaoLogin} />
        </div>
      </div>
    </div>
  );
}
