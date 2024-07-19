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
}

const MyPostSort: React.FC<Props> = ({
  isReviewClicked,
  setIsReviewClicked,
  isAccompanyClicked,
  isGuideClicked,
  setIsAccompanyClicked,
  setIsGuideClicked,
}) => {
  
  const buttonHandler = (type: string) => {
    setIsReviewClicked(type === "review");
    setIsAccompanyClicked(type === "accompany");
    setIsGuideClicked(type === "guide");
  };

  return (
    <div className={cx("mySort-container")}>
      <button
        className={cx("review-button", {
          "review-button-active": isReviewClicked,
        })}
        onClick={()=>buttonHandler("review")}
      >
        후기
      </button>
      <button
        className={cx("accompany-button", {
          "accompany-button-active": isAccompanyClicked,
        })}
        onClick={()=>buttonHandler("accompany")}
      >
        동행
      </button>
      <button
        className={cx("guide-button", {
          "guide-button-active": isGuideClicked,
        })}
        onClick={()=>buttonHandler("guide")}
      >
        가이드
      </button>
    </div>
  );
};

export default MyPostSort;
