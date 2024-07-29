import React from "react";
import axios from "axios";
import classnames from "classnames/bind";
import styles from "./CourseDoubleDelete.module.css";

const cx = classnames.bind(styles);

interface Props {
  id: number;
  deletePostTitle: string;
  isDoubleDeleteOpen: boolean;
  setIsDoubleDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getMyCourse: () => void;
}

const CourseDoubleDelete = ({
  id,
  deletePostTitle,
  isDoubleDeleteOpen,
  setIsDoubleDeleteOpen,
  setIsDeleteOpen,
  getMyCourse,
}: Props) => {
  //cancel button hanlder
  const clickCancelHandler = () => {
    setIsDoubleDeleteOpen(false);
    setIsDeleteOpen(false);
  };

  //cofirm button handler
  const clickConfirmHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("현재 토큰이 없습니다.");
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/delete-boards/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("여행 경로/게시글 함께 삭제 성공", response.data);
        setIsDoubleDeleteOpen(false);
        setIsDeleteOpen(false);
        getMyCourse();
      } else {
        console.log("여행 경로/게시글 함께 삭제 실패", response.data);
      }
    } catch (error) {
      console.error("여행 경로와 게시글 함께 삭제 요청 중 에러 발생", error);
    }
  };

  if (!isDoubleDeleteOpen) return null;

  return (
    <div className={cx("double-delete-overlays")}>
      <div className={cx("double-delete-container")}>
        <div className={cx("delete-alert-cotainer")}>
          <p className={cx("delete-statement")}>
            이 여행 경로 삭제 시, 내 게시글 중{" "}
            <span className={cx("delete-title")}>{deletePostTitle}</span>도 함께
            삭제됩니다.
          </p>
        </div>
        <div className={cx("buttons-container")}>
          <button className={cx("button-cancel")} onClick={clickCancelHandler}>
            취소
          </button>
          <button
            className={cx("button-confirm")}
            onClick={clickConfirmHandler}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDoubleDelete;
