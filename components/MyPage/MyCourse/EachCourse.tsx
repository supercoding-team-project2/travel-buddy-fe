import React, { useEffect, useState } from "react";
import axios from "axios";

import classNames from "classnames/bind";
import styles from "./EachCourse.module.css";

import Image from "next/image";
import edit from "../../../assets/edit.png";
import bin from "../../../assets/bin.png";

import CourseDeleteModal from "./CourseDeleteModal";

const cx = classNames.bind(styles);

interface Props {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  isCourseOpen: boolean;
  clickEachHandler: () => void;
}

const EachCourse: React.FC<Props> = ({
  id,
  name,
  startDate,
  endDate,
  createdAt,
  isCourseOpen,
  clickEachHandler,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [detailData, setDetailData] = useState();

  //현재 id가 열려있을 때, axios get 요청
  useEffect(() => {
    if (isCourseOpen) {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        axios
          .get("url", { headers: { Authorization: `Bearer ${accessToken}` } })
          .then((response) => {
            console.log("여행 경로 디테일 조회 데이터", response.data);
            setDetailData(response.data);
          })
          .catch((error) => {
            console.error("여행 경로 디테일 조회 요청 실패", error);
          });
      }
    }
  }, [isCourseOpen]);

  return (
    <>
      <CourseDeleteModal
        isDeleteOpen={isDeleteModalOpen}
        setIsDeleteOpen={setIsDeleteModalOpen}
      />
      <div
        className={cx("each-course-container", {
          "each-course-container-active": isHovered,
        })}
        onClick={clickEachHandler}
      >
        <div className={cx("show-course")}>
          <div
            className={cx("course-name")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {name}
          </div>
          <div className={cx("course-period")}>
            {startDate} ~ {endDate}
          </div>
          <div className={cx("course-posted-date")}>{createdAt}</div>
          <div className={cx("course-icons-container")}>
            <div className={cx("image-conatiner")}>
              <Image src={edit} alt="edit" className={cx("edit-icon")} />
            </div>
            <div className={cx("image-conatiner")}>
              <Image
                src={bin}
                alt="bin"
                className={cx("bin-icon")}
                onClick={() => setIsDeleteModalOpen(true)}
              />
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
