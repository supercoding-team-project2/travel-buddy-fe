import React from "react";

import MyPostSort from "./MyPostSort";
import EachMyPost from "./EachMyPost";

import classNames from "classnames/bind";
import styles from "./MyPost.module.css";
import Image from "next/image";
import upArrow from "../../../assets/up-arrow.png";

import { useState } from "react";

const cx = classNames.bind(styles);

const MyPost: React.FC = () => {
  const [isAccompanyClicked, setIsAccompanyClicked] = useState<boolean>(true);
  const [isGuideClicked, setIsGuideClicked] = useState<boolean>(false);

  return (
    <div className={cx("myPost-container")}>
      <div
        className={cx("upArrow-container")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className={cx("upArrow-word")}>Top</div>
        <Image src={upArrow} alt="up-arrow" className={cx("upArrow-icon")} />
      </div>
      <MyPostSort
        isAccompanyClicked={isAccompanyClicked}
        isGuideClicked={isGuideClicked}
        setIsAccompanyClicked={setIsAccompanyClicked}
        setIsGuideClicked={setIsGuideClicked}
      />
      <div className={cx("myPost-list-container")}>
        <EachMyPost />
        <EachMyPost />
        <EachMyPost />
      </div>
    </div>
  );
};

export default MyPost;
