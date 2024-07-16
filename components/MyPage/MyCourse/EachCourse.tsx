import React from "react";

import classNames from "classnames/bind";
import styles from "./EachCourse.module.css";

import Image from "next/image";
import edit from "../../../assets/edit.png";
import bin from "../../../assets/bin.png";

import { useState } from "react";
import CourseDeleteModal from "./CourseDeleteModal";

const cx = classNames.bind(styles);

interface Props {
  isCourseOpen: boolean;
  clickEachHandler: () => void;
}

const EachCourse: React.FC<Props> = ({ isCourseOpen, clickEachHandler }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <CourseDeleteModal isDeleteOpen={isDeleteModalOpen} setIsDeleteOpen={setIsDeleteModalOpen}/>
      <div className={cx("each-course-container", {"each-course-container-active": isHovered})} onClick={clickEachHandler}>
        <div className={cx("show-course")}>
          <div className={cx("course-name")} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>여행 이름</div>
          <div className={cx("course-period")}>
            2024년 7월 10일 ~ 2024년 7월 15일
          </div>
          <div className={cx("course-posted-date")}>2024/07/02</div>
          <div className={cx("course-icons-container")}>
            <div className={cx("image-conatiner")}>
              <Image src={edit} alt="edit" className={cx("edit-icon")} />
            </div>
            <div className={cx("image-conatiner")}>
              <Image src={bin} alt="bin" className={cx("bin-icon")} onClick={() => setIsDeleteModalOpen(true)}/>
            </div>
          </div>
        </div>
        {isCourseOpen && (
          <div className={cx("show-detail")}>
            <div className={cx("each-detail-container")}></div>
            <div className={cx("show-detail-date")}>여행 날짜</div>
            <div className={cx("show-detail-course")}>여행 경로</div>
            <div className={cx("show-detail-memo")}>여행 코스 메모</div>
          </div>
        )}
      </div>
    </>
  );
};

export default EachCourse;
