import React from "react";

import classNames from "classnames/bind";
import styles from "./MyCourse.module.css";

import Image from "next/image";
import upArrow from "../../../assets/up-arrow.png";

import EachCourse from "./EachCourse";
import EmptyMyCourse from "./EmptyMyCourse";

import { useState } from "react";
import { useRouter } from "next/navigation";
const cx = classNames.bind(styles);

const MyCourse = () => {
  const router = useRouter();

  //테스트 데이터 배열
  const testData: any = [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  //하나의 여행 경로 컴포넌트가 클릭 되었을 때, 나머지는 다 닫아놓기
  const clickEachCourseHandler = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <>
      {testData.length === 0 ? (
        <EmptyMyCourse />
      ) : (
        <main className={cx("my-course-container")}>
          <div
            className={cx("upArrow-container")}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className={cx("upArrow-word")}>Top</div>
            <Image
              src={upArrow}
              alt="up-arrow"
              className={cx("upArrow-icon")}
            />
          </div>
          <div className={cx("course-button-container")}>
            <button
              className={cx("course-button")}
              onClick={() => router.push("/course")}
            >
              내 경로 생성하기
            </button>
          </div>
          <div className={cx("courses-container")}>
            {testData.map((element: any, index: number) => {
              return (
                <EachCourse
                  key={index}
                  isCourseOpen={index === openIndex}
                  clickEachHandler={() => clickEachCourseHandler(index)}
                />
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default MyCourse;
