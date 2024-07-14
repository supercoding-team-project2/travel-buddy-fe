import React from "react";

import MyPostSort from "./MyPostSort";
import EachMyPost from "./EachMyPost";

import classNames from "classnames/bind";
import styles from "./MyPost.module.css";

import { useState } from "react";

const cx = classNames.bind(styles);

const MyPost: React.FC = () => {
  const [isAccompanyClicked, setIsAccompanyClicked] = useState<boolean>(true);
  const [isGuideClicked, setIsGuideClicked] = useState<boolean>(false);

  return (
    <div className={cx("myPost-container")}>
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
