'use client';

import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './VerifyPhone.module.css';

const cx = classNames.bind(styles);

export function VerifyPhoneClient() {
  const [phoneNum, setPhoneNum] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup/sms/send`, {
        phoneNum,
      });
      if ((response.status = 200)) {
        setIsCodeSent(true);
        setErrorMessage(null);
      } else {
        console.error('Failed to send code');
      }
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const verifyCodeAndProceed = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup/sms/check`, {
        phoneNum,
        code: verificationCode,
      });

      if (response.status === 200) {
        setIsRegistered(response.data.isRegistered);
        setErrorMessage(null);
      } else if (response.status === 400) {
        setErrorMessage('인증 실패');
      } else if (response.status === 409) {
        setErrorMessage('이미 가입된 번호입니다.');
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div className={cx('VerifyPhone')}>
      <div className={cx('leftWrapper')}>
        <img src="/svg/air-balloon.svg" alt="" className={cx('airBalloon')} />
      </div>
      <div className={cx('rightWrapper')}>
        <div className={cx('title')}>Verify Phone</div>
        <div className={cx('container')}>
          <form className={cx('formContainer')} onSubmit={(e) => e.preventDefault()}>
            <div className={cx('inputUnit')}>
              <div className={cx('inputTitle')}>Phone Number</div>
              <input
                className={cx('inputContent')}
                type="text"
                placeholder="Enter your Phone Number here"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>
            {isCodeSent ? (
              <>
                <div className={cx('inputUnit')}>
                  <div className={cx('inputTitle')}>Verify Code</div>
                  <input
                    className={cx('inputContent')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Verify Code here"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
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
                <button className={cx('submitButton')} onClick={verifyCodeAndProceed}>
                  Submit
                </button>
                {errorMessage && <div className={cx('errorMessage')}>{errorMessage}</div>}
              </>
            ) : (
              <button className={cx('getCodeButton')} onClick={sendVerificationCode}>
                Send Code
              </button>
            )}
          </form>
          <hr className={cx('line')} />
          <div className={cx('bottomWrapper')}>
            <div className={cx('text')}>이미 계정이 있으세요?</div>
            <Link href={'/login'}>로그인하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
