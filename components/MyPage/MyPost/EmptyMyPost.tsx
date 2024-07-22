import React from "react";

import classNames from "classnames/bind";
import styles from "./EmptyMyPost.module.css";

import Image from "next/image";
import empty from "../../../assets/empty.png";

const cx = classNames.bind(styles);

const EmptyMyPost: React.FC = () => {
  return (
    <div className={cx("empty-post-container")}>
      <Image src={empty} alt="empty" className={cx("empty-icon")} />
      <div className={cx("empty-statement")}>작성한 게시글이 없습니다</div>
      <button className={cx("redirect-post-button")}>게시글 생성하기</button>
    </div>
  );
};

export default EmptyMyPost;
