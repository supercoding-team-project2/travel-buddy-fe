import React from "react";

import classNames from "classnames/bind";
import styles from "./EmptyMyCourse.module.css";

import Image from "next/image";
import empty from "../../../assets/empty.png";

const cx = classNames.bind(styles);

const EmptyMyCourse: React.FC = () => {
  return (
    <div className={cx("empty-course-container")}>
      <Image src={empty} alt="empty" className={cx("empty-icon")}/>
      <div className={cx("empty-statement")}>작성한 여행 경로가 없습니다</div>
      <button className={cx("redirect-course-button")}>내 경로 생성하기</button>
    </div>
  );
};

export default EmptyMyCourse;
