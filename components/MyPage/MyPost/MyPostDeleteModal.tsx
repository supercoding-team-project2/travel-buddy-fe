import React from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";
import styles from "./MyPostDeleteModal.module.css";

import Image from "next/image";
import exit from "../../../assets/exit.png";

const cx = classNames.bind(styles);
interface Props {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPostDeleteModal: React.FC<Props> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}) => {
  if (!isDeleteModalOpen) return null;

  return createPortal(
    <div className={cx("delete-overlays")}>
      <div className={cx("delete-modal-container")}>
        <div className={cx("delete-exit-icon")}>
          <Image
            src={exit}
            alt="exit"
            className={cx("exit-icon")}
            onClick={() => setIsDeleteModalOpen(false)}
          />
        </div>
        <div className={cx("check-deletion")}>
          이 게시글을 삭제하시겠어요?
        </div>
        <div className={cx("delete-buttons-container")}>
          <button
            className={cx("cancel-button")}
            onClick={() => setIsDeleteModalOpen(false)}
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

export default MyPostDeleteModal;
