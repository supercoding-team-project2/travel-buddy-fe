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

  //테스트 데이터 배열
  const [courseData, setCourseData] = useState([
    {
      routeId: 1,
      title: "여행 이름1",
      description: "여행 메모입니당",
      startAt: "2024-07-01",
      endAt: "2024-07-02",
      createdAt: "2024-05-23",
      days: [
        {
          day: "2024-07-01",
          places: [
            {
              placeName: "장소 1",
              placeCategory: "ATTRACTION",
            },
            {
              placeName: "장소 2",
              placeCategory: "RESTAURANT",
            },
          ],
        },
      ],
    },
    {
      routeId: 2,
      title: "여행 이름2",
      description: "두번째 메모",
      startAt: "2024-07-12",
      endAt: "2024-07-13",
      createdAt: "2024-06-02",
      days: [
        {
          day: "2024-07-11",
          places: [
            {
              placeName: "장소 1",
              placeCategory: "ATTRACTION1",
            },
            {
              placeName: "장소 2",
              placeCategory: "RESTAURANT1",
            },
          ],
        },
        {
          day: "2024-07-12",
          places: [
            {
              placeName: "장소 1",
              placeCategory: "ATTRACTION2",
            },
            {
              placeName: "장소 2",
              placeCategory: "RESTAURANT2",
            },
          ],
        },
      ],
    },
    {
      routeId: 3,
      title: "여행 이름3",
      description: "세번째 메모입니답",
      startAt: "2024-08-02",
      endAt: "2024-08-03",
      createdAt: "2024-07-15",
      days: [
        {
          day: "2024-08-15",
          places: [
            {
              placeName: "장소 1",
              placeCategory: "ATTRACTION1",
            },
            {
              placeName: "장소 2",
              placeCategory: "RESTAURANT1",
            },
          ],
        },
        {
          day: "2024-08-16",
          places: [
            {
              placeName: "장소 1",
              placeCategory: "ATTRACTION2",
            },
            {
              placeName: "장소 2",
              placeCategory: "RESTAURANT2",
            },
          ],
        },
        {
          day: "2024-08-17",
          places: [
            {
              placeName: "장소 1",
              placeCategory: "ATTRACTION2",
            },
            {
              placeName: "장소 2",
              placeCategory: "RESTAURANT2",
            },
          ],
        },
      ],
    },
  ]);

  //하나의 여행 경로 컴포넌트가 클릭 되었을 때, 나머지는 다 닫아놓기
  const clickEachCourseHandler = (id: number) => {
    setOpenId(id === openId ? null : id);
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
