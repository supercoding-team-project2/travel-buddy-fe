import React, { useState } from "react";
import { useRouter } from "next/navigation";

import classNames from "classnames/bind";
import styles from "./EachMyPost.module.css";
import Image from "next/image";
import edit from "@/assets/edit.png";
import bin from "@/assets/bin.png";
import picture from "@/assets/travel.jpg";

import MyPostDeleteModal from "./MyPostDeleteModal";

const cx = classNames.bind(styles);

interface Props {
  id: number;
  photo: string;
  title: string;
  introduction: string;
  createdAt: string;
  category: string;
  token: string | null;
  fetchPostData: (category: string) => void;
}

// return에 photo 갈아끼우기
const EachMyPost = ({
  id,
  photo,
  title,
  introduction,
  category,
  createdAt,
  token,
  fetchPostData,
}: Props) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  //소개글이 정해진 글자수 150보다 넘으면 ... 띄우기
  const truncateIntroduction = (introduction: string) => {
    const MAX_INTRODUCTION_LENGTH = 155;

    if (introduction?.length > MAX_INTRODUCTION_LENGTH) {
      return introduction.substring(0, MAX_INTRODUCTION_LENGTH) + " ...";
    }

    return introduction;
  };

  const formatDate = (date: string) => {
    const [datePart] = date.split(" ");

    return datePart.replace(/-/g, "/");
  };

  return (
    <>
      <MyPostDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        id={id}
        category={category}
        fetchPostData={fetchPostData}
        token={token}
      />
      <div className={cx("each-post-container")}>
        <div className={cx("post-picture-container")}>
          <Image className={cx("post-picture")} src={photo} alt="picture" />
        </div>
        <div className={cx("each-post-inner")}>
          <div className={cx("post-buttons-container")}>
            <div
              className={cx("icon-container")}
              onClick={() => router.push(`/post-edit/${id}`)}
            >
              <Image src={edit} alt="edit" className={cx("edit-icon")} />
            </div>
            <div
              className={cx("icon-container")}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Image src={bin} alt="bin" className={cx("bin-icon")} />
            </div>
          </div>
          <div
            className={cx("post-detail-container")}
            onClick={() => router.push(`/post-detail/${id}`)}
          >
            <div className={cx("post-title")}>{title}</div>
            <div className={cx("post-introduction")}>
              {truncateIntroduction(introduction)}
            </div>
            <div className={cx("post-date")}>{formatDate(createdAt)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachMyPost;
