import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

import classNames from "classnames/bind";
import styles from "./EmptyMyPost.module.css";

import Image from "next/image";
import empty from "../../../assets/empty.png";

const cx = classNames.bind(styles);

const EmptyMyPost: React.FC = () => {
  const router = useRouter();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    setIsButtonLoading(false);
  }, [])

  const clickButtonHandler = () => {
    setIsButtonLoading(true)
    router.push("/post-create")
  }

  return (
    <div className={cx("empty-post-container")}>
      <Image src={empty} alt="empty" className={cx("empty-icon")} />
      <div className={cx("empty-statement")}>작성한 게시글이 없습니다</div>
      <button className={cx("redirect-post-button")} onClick={clickButtonHandler}>
        {isButtonLoading ? (<img src="/gif/loading-1.gif" alt="Loading" width={25} height={25} className={cx("loading-icon")}/>) : <div>게시글 생성하기</div>}
</button>
    </div>
  );
};

export default EmptyMyPost;
