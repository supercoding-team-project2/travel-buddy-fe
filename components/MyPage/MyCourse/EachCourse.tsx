import React, { useEffect, useState } from "react";
import axios from "axios";

import classNames from "classnames/bind";
import styles from "./EachCourse.module.css";

import Image from "next/image";
import edit from "@/assets/edit.png";
import bin from "@/assets/bin.png";

import CourseDeleteModal from "./CourseDeleteModal";
import TripBar from "./TripBar";

const cx = classNames.bind(styles);

interface Props {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  days: [];
  isCourseOpen: boolean;
  clickEachHandler: () => void;
  getMyCourse: () => void;
}

const EachCourse: React.FC<Props> = ({
  id,
  title,
  description,
  startAt,
  endAt,
  createdAt,
  days,
  isCourseOpen,
  clickEachHandler,
  getMyCourse,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ismodifyClicked, setIsModifyClicked] = useState(false);
  const [modifytitle, setModifyTitle] = useState(title);
  const [modifyMemo, setModifyMemo] = useState(description);

  const formatTripDate = (date: string) => {
    const shortDate = date.split("T")[0];
    const [year, month, day] = shortDate.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  const formatCreatedDate = (date: string) => {
    const shortDate = date.split("T")[0];
    const [year, month, day] = shortDate.split("-");
    return `${year}/${month}/${day}`;
  };

  const modifyTitleHandler = () => {};
  const modifyMemoHandler = () => {};

  return (
    <>
      <CourseDeleteModal
        isDeleteOpen={isDeleteModalOpen}
        setIsDeleteOpen={setIsDeleteModalOpen}
        id={id}
        getMyCourse={getMyCourse}
      />
      <div
        className={cx("each-course-container", {
          "each-course-container-active": isHovered,
        })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cx("show-course")}>
          {ismodifyClicked ? (
            <input
              className={cx("modify-title-input")}
              value={modifytitle}
              onChange={modifyTitleHandler}
            ></input>
          ) : (
            <div className={cx("course-name")} onClick={clickEachHandler}>
              {title}
            </div>
          )}
          <div className={cx("course-period")}>
            {formatTripDate(startAt)} ~ {formatTripDate(endAt)}
          </div>
          <div className={cx("course-posted-date")}>
            {formatCreatedDate(createdAt)}
          </div>
          <div className={cx("course-icons-container")}>
            <div
              className={cx("image-conatiner")}
              onClick={() => setIsModifyClicked(true)}
            >
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
          <div
            className={cx("show-detail")}
            onMouseEnter={() => setIsHovered(false)}
          >
            <div className={cx("each-detail-container")}></div>
            {days?.length > 0 &&
              days.map((eachDay: { day: string; places: any[] }) => {
                return <TripBar day={eachDay.day} places={eachDay.places} />;
              })}
            {ismodifyClicked ? (
              <div className={cx("modify-memo-container")}>
                <textarea
                  className={cx("modify-memo")}
                  value={modifyMemo}
                  onChange={modifyMemoHandler}
                ></textarea>
                <button className={cx("modify-button")}>수정</button>
              </div>
            ) : (
              <div className={cx("show-detail-memo")}>{description}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EachCourse;
