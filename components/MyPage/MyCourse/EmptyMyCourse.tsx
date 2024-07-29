import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

import classNames from "classnames/bind";
import styles from "./EmptyMyCourse.module.css";

import Image from "next/image";
import empty from "../../../assets/empty.png";

const cx = classNames.bind(styles);

const EmptyMyCourse: React.FC = () => {
  const router = useRouter();
  consst [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    setIsButtonLoading(false)
  }, [])

  const clickButtonHandler = () => {
    setIsButtonLoading(true)
    router.push("/course")
  }

  return (
    <div className={cx("empty-course-container")}>
      <Image src={empty} alt="empty" className={cx("empty-icon")}/>
      <div className={cx("empty-statement")}>작성한 여행 경로가 없습니다</div>
      <button className={cx("redirect-course-button")} onClick={clickButtonHandler}>
        {isButtonLoading ?  (<img src="/gif/loading-1.gif" alt="Loading" width={25} height={25} className={cx("loading-icon")}/>) : <div>내 경로 생성하기</div>}
</button>
    </div>
  );
};

export default EmptyMyCourse;
