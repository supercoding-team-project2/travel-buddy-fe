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
  const [isUparrowVisible, setIsUparrowVisible] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  //테스트 데이터 배열
  const [courseData, setCourseData] = useState([]);

  //하나의 여행 경로 컴포넌트가 클릭 되었을 때, 나머지는 다 닫아놓기
  const clickEachCourseHandler = (id: number) => {
    setOpenId(id === openId ? null : id);

    if (editingCourseId !== id) {
      // editingCourseId(null)
    }
  };

  const getMyCourse = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/list`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log("경로 조회 데이터", response.data);
          setCourseData(response.data);
        })
        .catch((error) => {
          console.error("경로 조회 요청 실패", error);
        });
    }
  };

  //경로 조회 axios get 요청
  useEffect(() => {
    getMyCourse();

    //Top arrow
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsUparrowVisible(true);
      } else {
        setIsUparrowVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {courseData.length === 0 ? (
        <EmptyMyCourse />
      ) : (
        <main className={cx("my-course-container")}>
          {isUparrowVisible && (
            <div
              className={cx("upArrow-container")}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image
                src={upArrow}
                alt="up-arrow"
                className={cx("upArrow-icon")}
              />
            </div>
          )}
          <div className={cx("course-button-container")}>
            <button
              className={cx("course-button")}
              onClick={() => router.push("/course")}
            >
              내 경로 생성하기
            </button>
          </div>
          <div className={cx("courses-container")}>
            {courseData.map((element: any, index: number) => {
              return (
                <EachCourse
                  key={element.routeId}
                  id={element.routeId}
                  title={element.title}
                  description={element.description}
                  startAt={element.startAt}
                  endAt={element.endAt}
                  createdAt={element.createdAt}
                  days={element.days}
                  isCourseOpen={element.routeId === openId}
                  clickEachHandler={() =>
                    clickEachCourseHandler(element.routeId)
                  }
                  getMyCourse={getMyCourse}
                  editingCourseId={editingCourseId}
                  setEditingCourseId={setEditingCourseId}
                  setOpenId={setOpenId}
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
