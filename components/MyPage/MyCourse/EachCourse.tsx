import React, { useEffect, useState } from "react";
import axios from "axios";

import classNames from "classnames/bind";
import styles from "./EachCourse.module.css";

import Image from "next/image";
import edit from "@/assets/edit.png";
import bin from "@/assets/bin.png";

import CourseDeleteModal from "./CourseDeleteModal";

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
  getMyCourse
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatTripDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  const formatCreatedDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}/${month}/${day}`;
  };

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
        onClick={clickEachHandler}
      >
        <div className={cx("show-course")}>
          <div
            className={cx("course-name")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {title}
          </div>
          <div className={cx("course-period")}>
            {formatTripDate(startAt)} ~ {formatTripDate(endAt)}
          </div>
          <div className={cx("course-posted-date")}>
            {formatCreatedDate(createdAt)}
          </div>
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
            {days?.length > 0 &&
              days.map((eachDay: { day: string; places: any[] }) => {
                return (
                  <>
                    <div className={cx("show-detail-date")}>{eachDay.day}</div>
                    <div className={cx("show-detail-course")}>
                      {eachDay.places.map((place) => (
                        <>
                          <div>{place.placeName}</div>
                          <div>{place.placeCategory}</div>
                        </>
                      ))}
                    </div>
                  </>
                );
              })}
            <div className={cx("show-detail-memo")}>{description}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default EachCourse;
