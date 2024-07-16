import React from "react";

import classNames from "classnames/bind";
import styles from "./MyInfo.module.css";

import Image from "next/image";
import view from "../../../assets/view.png";
import userImage from "../../../assets/userEx.png";

import { useState } from "react";

const cx = classNames.bind(styles);

const MyInfo: React.FC = () => {
  const [isPasswordViewed, setIsPasswordViewed] = useState(false);
  const [isPasswordCheckViewed, setIsPasswordCheckViewed] =
    useState(false);

  const [secondSocialNumber, setSecondSocialNumber] =
    useState("2345678"); //마스킹 되기 전 주민등록번호 뒷자리
  const [maskedSocialNumber, setMaskedSocialNumber] = useState(""); //마스킹 된 후의 주민등록번호 뒷자리

  // 주민등록번호 뒷자리 마스킹하는 함수
  const hideSecondSocial = (value: string) => {
    const hiddenValue = value.substring(0, 1) + "*".repeat(value.length - 1);

    setMaskedSocialNumber(hiddenValue);

    return hiddenValue;
  };

  if (!maskedSocialNumber.includes("*")) {
    hideSecondSocial(secondSocialNumber);
  }

  return (
    <div className={cx("myinfo-container")}>
      <div className={cx("myinfo-statement")}>회원 정보 수정</div>
      <form className={cx("myinfo-form")}>
        <div className={cx("email-container")}>
          <label className={cx("email-label")}>Email</label>
          <input className={cx("email-input")} value="test@gmail.com" />
        </div>
        <div className={cx("name-container")}>
          <label className={cx("name-label")}>Name</label>
          <input className={cx("name-input")} value="유저 네임" />
        </div>
        <div className={cx("password-container")}>
          <label className={cx("password-label")}>Password</label>
          <input
            className={cx("password-input")}
            type={isPasswordViewed ? "text" : "password"}
            value="testytester"
          />
          <Image
            src={view}
            alt="view"
            className={cx("view-icon")}
            onClick={() => {
              setIsPasswordViewed(!isPasswordViewed);
            }}
          />
        </div>
        <div className={cx("password-check-container")}>
          <label className={cx("password-check-label")}>Password Check</label>
          <input
            className={cx("password-check-input")}
            type={isPasswordCheckViewed ? "text" : "password"}
            value="testytester"
          />
          <Image
            src={view}
            alt="view"
            className={cx("view-icon")}
            onClick={() => {
              setIsPasswordCheckViewed(!isPasswordCheckViewed);
            }}
          />
        </div>
        <div className={cx("verification-container")}>
          <button className={cx("verification-button")}>E-mail 인증</button>
        </div>
        <div className={cx("socialNum-container")}>
          <label className={cx("socialNum-label")}>주민등록번호</label>
          <div className={cx("socialNum-input-container")}>
            <input
              className={cx("socialNum-first-input")}
              type="tel"
              pattern="[0-9]{6}"
              value="971017"
            />
            <input
              className={cx("socialNum-second-input")}
              value={maskedSocialNumber}
            />
          </div>
        </div>
        <div className={cx("gender-container")}>
          <input className={cx("gender-input")} type="radio" checked />
          <label className={cx("gender-label")}>남성</label>
        </div>
        <div className={cx("picture-container")}>
          <label className={cx("picture-label")} htmlFor="image-change-input">
            프로필 사진 수정
          </label>
          <input
            id="image-change-input"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
          <div className={cx("image-container")}>
            <Image
              src={userImage}
              alt="user-image"
              className={cx("user-image")}
            />
          </div>
        </div>
        <div className={cx("modify-container")}>
          <button className={cx("modify-button")}>수정하기</button>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
