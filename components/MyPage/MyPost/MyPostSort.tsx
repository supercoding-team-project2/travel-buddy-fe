import React from "react";

import classNames from "classnames/bind";
import styles from "./MyPostSort.module.css";

const cx = classNames.bind(styles);

interface Props {
  isReviewClicked: boolean;
  isAccompanyClicked: boolean;
  isGuideClicked: boolean;
  setIsReviewClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccompanyClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGuideClicked: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPostData: (category: string) => void;
}

const MyPostSort: React.FC<Props> = ({
  isReviewClicked,
  setIsReviewClicked,
  isAccompanyClicked,
  isGuideClicked,
  setIsAccompanyClicked,
  setIsGuideClicked,
  fetchPostData,
}) => {
  
  const buttonHandler = (category: string) => {
    setIsReviewClicked(category === "REVIEW");
    setIsAccompanyClicked(category === "COMPANION");
    setIsGuideClicked(category === "GUIDE");

    //매개변수 카테고리에 맞는 걸로 axios get 요청
    fetchPostData(category);
  };

  return (
    <div className={cx("mySort-container")}>
      <button
        className={cx("review-button", {
          "review-button-active": isReviewClicked,
        })}
        onClick={() => buttonHandler("REVIEW")}
      >
        후기
      </button>
      <button
        className={cx("accompany-button", {
          "accompany-button-active": isAccompanyClicked,
        })}
        onClick={() => buttonHandler("COMPANION")}
      >
        동행
      </button>
      <button
        className={cx("guide-button", {
          "guide-button-active": isGuideClicked,
        })}
        onClick={() => buttonHandler("GUIDE")}
      >
        가이드
      </button>
    </div>
  );
};

export default MyPostSort;
