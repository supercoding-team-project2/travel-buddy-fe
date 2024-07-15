import React from "react";

import classNames from "classnames/bind";
import styles from "./EachMyPost.module.css";
import Image from "next/image";
import edit from "../../../assets/edit.png";
import bin from "../../../assets/bin.png";
import picture from "../../../assets/travel.jpg";

import { useState } from "react";
import MyPostDeleteModal from "./MyPostDeleteModal";

const cx = classNames.bind(styles);

const EachMyPost: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <>
      <MyPostDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <div className={cx("each-post-container")}>
        <div className={cx("post-picture-container")}>
          <Image className={cx("post-picture")} src={picture} alt="picture" />
        </div>
        <div className={cx("each-post-inner")}>
          <div className={cx("post-buttons-container")}>
            <div className={cx("icon-container")}>
              <Image src={edit} alt="edit" className={cx("edit-icon")} />
            </div>
            <div className={cx("icon-container")} onClick={()=>setIsDeleteModalOpen(true)}>
              <Image src={bin} alt="bin" className={cx("bin-icon")} />
            </div>
          </div>
          <div className={cx("post-detail-container")}>
            <div className={cx("post-tilte")}>글제목입니당</div>
            <div className={cx("post-introduction")}>간략한 소개글 데이터를 두는 곳</div>
            <div className={cx("post-date")}>작성일: 2024/07/21</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachMyPost;
