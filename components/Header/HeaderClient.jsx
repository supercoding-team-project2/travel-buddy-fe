'use client';

import classNames from 'classnames/bind';
import styles from './Header.module.css';

import Image from 'next/image';
import account from '../../assets/account.png';
import chat from '../../assets/chat.png';
import { useEffect, useRef, useState } from 'react';

//home&explore Link로 바꾸기 및 useRouter 사용해 현재 페이지의 nav 디자인 바꾸기
// import Link from "next/link";

const cx = classNames.bind(styles);

export function HeaderClient() {
  const [isAccountDropOpen, setIsAccountDropOpen] = useState(false);
  const accountDropRef = useRef(null);

  // account 아이콘 dropdown이 열려있을 때, 아무 데나 누르면 다시 닫히게 하는 로직
  useEffect(() => {
    const hideDropWhenClickAnywhere = (event) => {
      if (
        isAccountDropOpen &&
        accountDropRef.current &&
        !accountDropRef.current.contains(event.target) &&
        !event.target.closest('.account-icon')
      ) {
        setIsAccountDropOpen(false);
      }
    };

    if (isAccountDropOpen) {
      document.addEventListener('mousedown', hideDropWhenClickAnywhere);
    } else {
      document.removeEventListener('mousedown', hideDropWhenClickAnywhere);
    }

    return () => {
      document.removeEventListener('mousedown', hideDropWhenClickAnywhere);
    };
  }, [isAccountDropOpen]);

  return (
    <div className={cx('Header')}>
      <div className={cx('company-container')}>
        <div className={cx('company-logo')}>Travel Buddy</div>
      </div>
      <div className={cx('navigatation-user-container')}>
        <div className={cx('header-nav')}>Home</div>
        <div className={cx('header-nav')}>Explore</div>
        <button className={cx('login-button')}>로그인</button>
        <button className={cx('signup-button')}>회원 가입</button>
        <Image
          className={cx('account-icon')}
          src={account}
          alt="account-icon"
          onClick={() => setIsAccountDropOpen((prev) => !prev)}
        />
        {isAccountDropOpen && (
          <div className={cx('account-dropbox')} ref={accountDropRef}>
            <div className={cx('dropbox-div')}>마이 페이지</div>
            <div className={cx('dropbox-div')}>로그아웃</div>
          </div>
        )}
        <Image className={cx('chat-icon')} src={chat} alt="chat-icon" />
      </div>
    </div>
  );
}
