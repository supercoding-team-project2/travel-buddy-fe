import React, { useEffect, useState } from "react";
import axios from "axios";

import classNames from "classnames/bind";
import styles from "./MyCourse.module.css";

import Image from "next/image";
import upArrow from "../../../assets/up-arrow.png";

import EachCourse from "./EachCourse";
import EmptyMyCourse from "./EmptyMyCourse";

import { useRouter } from "next/navigation";
const cx = classNames.bind(styles);

const MyCourse = () => {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);

  //테스트 데이터 배열
  const [postData, setPostData] = useState([
    {
      id: 1,
      name: "여행 이름1",
      startDate: "2024년 7월 10일",
      endDate: "2024년 7월 11일",
      createdAt: "2024/07/02",
    },
    {
      id: 2,
      name: "여행 이름2",
      startDate: "2024년 7월 12일",
      endDate: "2024년 7월 13일",
      createdAt: "2024/07/03",
    },
    {
      id: 3,
      name: "여행 이름3",
      startDate: "2024년 7월 14일",
      endDate: "2024년 7월 15일",
      createdAt: "2024/07/04",
    },
  ]);

  //하나의 여행 경로 컴포넌트가 클릭 되었을 때, 나머지는 다 닫아놓기
  const clickEachCourseHandler = (id: number) => {
    setOpenId(id === openId ? null : id);
  };

  // 경로 조회 axios get 요청
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      axios
        .get("url", { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          console.log("경로 조회 데이터", response.data);
          setPostData(response.data);
        })
        .catch((error) => {
          console.error("경로 조회 요청 실패", error);
        });
    }
  }, []);

  return (
    <>
      {postData.length === 0 ? (
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
            {postData.map((element: any, index: number) => {
              return (
                <EachCourse
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  startDate={element.startDate}
                  endDate={element.endDate}
                  createdAt={element.createdAt}
                  isCourseOpen={element.id === openId}
                  clickEachHandler={() => clickEachCourseHandler(element.id)}
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
