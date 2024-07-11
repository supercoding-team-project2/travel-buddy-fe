import classNames from "classnames/bind";
import styles from "./Header.module.css";

import Image from "next/image";
import account from "../../assets/account.png";
import chat from "../../assets/chat.png";

//home&explore Link로 바꾸기 및 useRouter 사용해 현재 페이지의 nav 디자인 바꾸기
// import Link from "next/link";

const cx = classNames.bind(styles);

export function Header() {
  return (
    <div className={cx("Header")}>
      <div className={cx("company-container")}>
        <div className={cx("company-logo")}>Travel Buddy</div>
      </div>
      <div className={cx("navigatation-user-container")}>
        <div className={cx("header-nav")}>Home</div>
        <div className={cx("header-nav")}>Explore</div>
        <button className={cx("login-button")}>Log In</button>
        <button className={cx("signup-button")}>Sign Up</button>
        <Image
          className={cx("account-icon")}
          src={account}
          alt="account-icon"
        />
        <Image className={cx("chat-icon")} src={chat} alt="chat-icon" />
      </div>
    </div>
  );
}
