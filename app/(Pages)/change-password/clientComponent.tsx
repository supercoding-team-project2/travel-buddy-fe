'use client';

import classNames from 'classnames/bind';
import styles from './change-password.module.css';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

export function ChangePasswordClient() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [showCheckPassword, setShowCheckPassword] = useState<boolean>(false);
  const [isCheckCorrect, setIsCheckCorrect] = useState<boolean>(false);

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/signup/sms/send', { phoneNumber });
      if (response.data.success) {
        setIsCodeSent(true);
      } else {
        console.error('Failed to send code');
      }
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const verifyCodeAndProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/sms-code/check', { phoneNumber, code: verificationCode });
      if (response.status === 200) {
        setIsRegistered(response.data.isRegistered);
      } else {
        console.error('Failed to verify code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleCheckPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };
  const toggleCheckPasswordVisibility = () => {
    setShowCheckPassword(!showCheckPassword);
  };

  return (
    <div className={cx('ChangePassword')}>
      <div className={cx('leftWrapper')}>
        <img src="/svg/air-balloon.svg" alt="" className={cx('airBalloon')} />
      </div>
      <div className={cx('rightWrapper')}>
        <div className={cx('title')}>Change Password</div>
        <div className={cx('container')}>
          <form className={cx('formContainer')}>
            {isRegistered === null ? (
              <>
                <div className={cx('inputUnit')}>
                  <div className={cx('inputTitle')}>Phone Number</div>
                  <input
                    className={cx('inputContent')}
                    type="text"
                    placeholder="Enter your Phone Number here"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {isCodeSent ? (
                  <>
                    <div className={cx('inputUnit')}>
                      <div className={cx('inputTitle')}>Verify Code</div>
                      <input
                        className={cx('inputContent')}
                        type={showCode ? 'text' : 'password'}
                        placeholder="Enter Verify Code here"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      {showCode ? (
                        <img
                          src="/svg/eye-open.svg"
                          onClick={() => setShowCode(!showCode)}
                          className={cx('showPasswordButton')}
                        />
                      ) : (
                        <img
                          src="/svg/eye-close.svg"
                          onClick={() => setShowCode(!showCode)}
                          className={cx('showPasswordButton')}
                        />
                      )}
                    </div>
                    <button className={cx('submitButton')} onClick={verifyCodeAndProceed}>
                      Submit
                    </button>
                  </>
                ) : (
                  <button className={cx('getCodeButton')} onClick={sendVerificationCode}>
                    Send Code
                  </button>
                )}
              </>
            ) : (
              <>
                <div className={cx('inputUnit')}>
                  <div className={cx('inputTitle')}>New Password</div>
                  <input
                    className={cx('inputContent')}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter your New Password here"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  {showNewPassword ? (
                    <img
                      src="/svg/eye-open.svg"
                      onClick={toggleNewPasswordVisibility}
                      className={cx('showPasswordButton')}
                    />
                  ) : (
                    <img
                      src="/svg/eye-close.svg"
                      onClick={toggleNewPasswordVisibility}
                      className={cx('showPasswordButton')}
                    />
                  )}
                </div>
                <div className={cx('inputUnit')}>
                  <div className={cx('inputTitle')}>Check Password</div>
                  <input
                    className={cx('inputContent')}
                    type={showCheckPassword ? 'text' : 'password'}
                    placeholder="Enter your New Password again"
                    value={checkPassword}
                    onChange={handleCheckPasswordChange}
                  />
                  {showCheckPassword ? (
                    <img
                      src="/svg/eye-open.svg"
                      onClick={toggleCheckPasswordVisibility}
                      className={cx('showPasswordButton')}
                    />
                  ) : (
                    <img
                      src="/svg/eye-close.svg"
                      onClick={toggleCheckPasswordVisibility}
                      className={cx('showPasswordButton')}
                    />
                  )}
                </div>

                <button className={cx('submitButton')}>apply</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
