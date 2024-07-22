import React from "react";

import classNames from "classnames/bind";
import styles from "./MyInfo.module.css";

import Image from "next/image";
import { StaticImageData } from "next/image";

import { useState } from "react";

const cx = classNames.bind(styles);

interface Props {
  profilePic: string | StaticImageData;
  setProfilePic: React.Dispatch<React.SetStateAction<string | StaticImageData>>;
}

const MyInfo = ({ profilePic, setProfilePic }: Props) => {
  const [secondSocialNumber, setSecondSocialNumber] = useState("2"); //마스킹 전 주민등록번호 뒷자리
  const [maskedSocialNumber, setMaskedSocialNumber] = useState(""); //마스킹이 더해진 후의 주민등록번호 뒷자리

  // 주민등록번호 뒷자리 마스킹 붙이는 함수
  const hideSecondSocial = (value: string) => {
    const hiddenValue = value.substring(0, 1) + "*".repeat(6);

    setMaskedSocialNumber(hiddenValue);

    return hiddenValue;
  };

  if (!maskedSocialNumber.includes("*")) {
    hideSecondSocial(secondSocialNumber);
  }

  const sortGender = () => {
    if (maskedSocialNumber) {
      if (maskedSocialNumber.charAt(0) === "1") {
        return "남성";
      } else {
        return "여성";
      }
    }
  };

  const pictureChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setProfilePic(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={cx("myinfo-container")}>
      <div className={cx("myinfo-statement")}>회원 정보</div>
      <div className={cx("myinfo-div")}>
        <div className={cx("myinfo-details")}>
          <div className={cx("email-container")}>
            <label className={cx("email-label")}>Email:</label>
            <div className={cx("email")}>test@gmail.com</div>
          </div>
          <div className={cx("name-container")}>
            <label className={cx("name-label")}>Name:</label>
            <div className={cx("name")}>유저 네임</div>
          </div>
          <div className={cx("socialNum-container")}>
            <label className={cx("socialNum-label")}>주민등록번호:</label>
            <div className={cx("socialNum-container")}>
              <div>971017-{maskedSocialNumber}</div>
            </div>
          </div>
          <div className={cx("gender-container")}>
            <input className={cx("gender-input")} type="radio" checked />
            <label className={cx("gender-label")}>{sortGender()}</label>
          </div>
        </div>
        <div className={cx("picture-container")}>
          <div className={cx("image-container")}>
            <Image
              src={profilePic}
              alt="user-image"
              className={cx("user-image")}
              width={120}
              height={120}
            />
          </div>
          <div className={cx("modify-container")}>
            <button className={cx("modify-button")}>
              <label
                htmlFor="image-change-input"
                className={cx("modify-label")}
              >
                프로필 사진 수정
              </label>
              <input
                id="image-change-input"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={pictureChangeHandler}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
