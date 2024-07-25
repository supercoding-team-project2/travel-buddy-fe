import React, { useEffect, useState, useRef } from "react";
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
  editingCourseId: number | null;
  clickEachHandler: () => void;
  getMyCourse: () => void;
  setEditingCourseId: React.Dispatch<React.SetStateAction<number | null>>;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
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
  editingCourseId,
  clickEachHandler,
  getMyCourse,
  setEditingCourseId,
  setOpenId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [modifyTitle, setModifyTitle] = useState(title);
  const [modifyMemo, setModifyMemo] = useState(description);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const ismodifyClicked = editingCourseId === id;

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

  const modifyTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModifyTitle(event.target.value);
  };

  const modifyMemoHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyMemo(event.target.value);
  };

  // 수정 버튼 핸들러
  const modifyButtonHandler = async (id: number) => {
    if (title === modifyTitle && description === modifyMemo) {
      alert("수정된 글이 없습니다.");
      return;
    }

    if (modifyTitle.trim().length < 1) {
      alert("한 글자 이상의 제목을 적어주세요.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/update/${id}`,
        {
          title: modifyTitle,
          description: modifyMemo,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("내 여행 경로 수정 성공", response.data);
        setEditingCourseId(null);
        getMyCourse();
      } else {
        console.log("내 여행 경로 수정 실패", response.status);
      }
    } catch (error) {
      console.error("내 여행 경로 수정 요청 중 에러", error);
    }
  };

  // 수정 아이콘 클릭 핸들러
  const clickEditHandler = () => {
    if (editingCourseId === id) {
      setEditingCourseId(null);
    } else {
      setEditingCourseId(id);
      setOpenId(id);
    }
  };

  useEffect(() => {
    if (ismodifyClicked && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [ismodifyClicked]);

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
              value={modifyTitle}
              onChange={modifyTitleHandler}
              ref={titleInputRef}
            />
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
            <div className={cx("image-conatiner")} onClick={clickEditHandler}>
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
                return (
                  <TripBar
                    key={eachDay.day}
                    day={eachDay.day}
                    places={eachDay.places}
                  />
                );
              })}
            {ismodifyClicked ? (
              <div className={cx("modify-memo-container")}>
                <textarea
                  className={cx("modify-memo")}
                  value={modifyMemo}
                  onChange={modifyMemoHandler}
                ></textarea>
                <button
                  className={cx("modify-button")}
                  onClick={() => modifyButtonHandler(id)}
                >
                  수정
                </button>
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
