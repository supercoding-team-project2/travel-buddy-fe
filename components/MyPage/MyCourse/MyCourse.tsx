import React from 'react';

import classNames from "classnames/bind";
import styles from "./MyCourse.module.css";
import EachCourse from './EachCourse';

import { useState } from "react";
const cx =  classNames.bind(styles);

const MyCourse = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  //하나의 여행 경로 컴포넌트가 클릭 되었을 때, 나머지는 다 닫아놓기 
  const clickEachCourseHandler = (index: number) => {
    setOpenIndex(index === openIndex ? null : index); 
  }

  return (
    <main className={cx("my-course-container")}>
      <div className={cx("course-button-container")}><button className={cx("course-button")}>내 경로 생성하기</button></div>
      <div className={cx("courses-container")}>
        {[0, 1, 2].map((element, index) => { return <EachCourse key={index} isCourseOpen={index === openIndex} clickEachHandler={() => clickEachCourseHandler(index)} />})}
     
      </div>
    </main>
  );
};

export default MyCourse;