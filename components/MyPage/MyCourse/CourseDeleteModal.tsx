import React from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";
import styles from "./CourseDeleteModal.module.css";

import Image from "next/image";
import exit from "../../../assets/exit.png";

const cx = classNames.bind(styles);
interface Props {
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseDeleteModal: React.FC<Props> = ({
  isDeleteOpen,
  setIsDeleteOpen,
}) => {
  if (!isDeleteOpen) return null;

  return createPortal(
    <div className={cx("delete-overlays")}>
      <div className={cx("delete-modal-container")}>
        <div className={cx("delete-exit-icon")}>
          <Image
            src={exit}
            alt="exit"
            className={cx("exit-icon")}
            onClick={() => setIsDeleteOpen(false)}
          />
        </div>
        <div className={cx("check-deletion")}>
          이 여행 경로를 삭제하시겠어요?
        </div>
        <div className={cx("delete-buttons-container")}>
          <button
            className={cx("cancel-button")}
            onClick={() => setIsDeleteOpen(false)}
          >
            취소
          </button>
          <button className={cx("delete-button")}>삭제</button>
        </div>
      </div>
    </div>,
    document.getElementById("overlays-modal")!
  );
};

export default CourseDeleteModal;
