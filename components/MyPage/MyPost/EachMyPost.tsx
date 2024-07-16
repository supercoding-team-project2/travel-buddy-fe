import React from "react";

import classNames from "classnames/bind";
import styles from "./EachMyPost.module.css";
import Image from "next/image";
import edit from "../../../assets/edit.png";
import bin from "../../../assets/bin.png";
import picture from "../../../assets/travel.jpg";

import { useState } from "react";
import MyPostDeleteModal from "./MyPostDeleteModal";

const cx = classNames.bind(styles);

const EachMyPost: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  //소개글이 정해진 글자수 150보다 넘으면 ... 띄우기
  const truncateIntroduction = (introduction: string) => {
    const MAX_INTRODUCTION_LENGTH = 150;

    if (introduction.length > MAX_INTRODUCTION_LENGTH) {
      return introduction.substring(0, MAX_INTRODUCTION_LENGTH) + " ...";
    }

    return introduction;
  };

  return (
    <>
      <MyPostDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <div className={cx("each-post-container")}>
        <div className={cx("post-picture-container")}>
          <Image className={cx("post-picture")} src={picture} alt="picture" />
        </div>
        <div className={cx("each-post-inner")}>
          <div className={cx("post-buttons-container")}>
            <div className={cx("icon-container")}>
              <Image src={edit} alt="edit" className={cx("edit-icon")} />
            </div>
            <div
              className={cx("icon-container")}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Image src={bin} alt="bin" className={cx("bin-icon")} />
            </div>
          </div>
          <div className={cx("post-detail-container")}>
            <div className={cx("post-tilte")}>글제목입니당</div>
            <div className={cx("post-introduction")}>
              {truncateIntroduction("'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.")}
            </div>
            <div className={cx("post-date")}>2024/07/21</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachMyPost;
