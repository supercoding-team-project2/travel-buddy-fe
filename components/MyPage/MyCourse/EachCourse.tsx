import React from 'react';

import classNames from "classnames/bind";
import styles from "./EachCourse.module.css";

import Image from 'next/image';
import edit from "../../../assets/edit.png";
import bin from "../../../assets/bin.png";

import { useState } from "react";

const cx =  classNames.bind(styles);

const EachCourse: React.FC = () => {
const [isCourseClicked, setIsCourseClicked] = useState<boolean>(false);
  return (
        <div className={cx("each-course-container")}>
          <div className={cx("course-name")}>여행 이름</div>
          <div className={cx("course-period")}>2024년 7월 10일 ~ 2024년 7월 15일</div>
          <div className={(cx("course-posted-date"))}>2024/07/02</div>
          <div className={(cx("course-icons-container"))}>
            <div className={cx("image-conatiner")}><Image src={edit} alt="edit" className={cx("edit-icon")}/></div>
            <div className={cx("image-conatiner")}><Image src={bin} alt="bin" className={cx("bin-icon")}/></div>
          </div>
        </div>
  );
};

export default EachCourse;