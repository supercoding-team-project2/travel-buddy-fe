import React from 'react';

import classNames from "classnames/bind";
import styles from "./MyCourse.module.css";
import EachCourse from './EachCourse';

const cx =  classNames.bind(styles);

const MyCourse = () => {
  return (
    <main className={cx("my-course-container")}>
      <div className={cx("course-button-container")}><button className={cx("course-button")}>내 경로 생성하기</button></div>
      <div className={cx("courses-container")}>
        <EachCourse />
        <EachCourse />
        <EachCourse />
      </div>
    </main>
  );
};

export default MyCourse;