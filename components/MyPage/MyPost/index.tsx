import React from "react";

import MyPostSort from "./MyPostSort";
import EachMyPost from "./EachMyPost";
import EmptyMyPost from "./EmptyMyPost";

import classNames from "classnames/bind";
import styles from "./MyPost.module.css";
import Image from "next/image";
import upArrow from "../../../assets/up-arrow.png";

import { useState } from "react";

const cx = classNames.bind(styles);

const MyPost: React.FC = () => {
  const testData: any = [0, 1, 2];

  const [isReviewClicked, setIsReviewClicked] = useState(false);
  const [isAccompanyClicked, setIsAccompanyClicked] = useState(false);
  const [isGuideClicked, setIsGuideClicked] = useState(false);

  return (
    <>
      {testData.length === 0 ? (
        <EmptyMyPost />
      ) : (
        <div className={cx("myPost-container")}>
          <div
            className={cx("upArrow-container")}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className={cx("upArrow-word")}>Top</div>
            <Image
              src={upArrow}
              alt="up-arrow"
              className={cx("upArrow-icon")}
            />
          </div>
          <MyPostSort
            isReviewClicked={isReviewClicked}
            setIsReviewClicked={setIsReviewClicked}
            isAccompanyClicked={isAccompanyClicked}
            isGuideClicked={isGuideClicked}
            setIsAccompanyClicked={setIsAccompanyClicked}
            setIsGuideClicked={setIsGuideClicked}
          />
          <div className={cx("myPost-list-container")}>
            {testData.map((element: any, index: number) => {
              return <EachMyPost key={index} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyPost;
