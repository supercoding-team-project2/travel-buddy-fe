import React from "react";

import classNames from "classnames/bind";
import styles from "./MyPostSort.module.css";

const cx = classNames.bind(styles);

interface Props {
  isAccompanyClicked: boolean;
  isGuideClicked: boolean;
  setIsAccompanyClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGuideClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPostSort: React.FC<Props> = ({
  isAccompanyClicked,
  isGuideClicked,
  setIsAccompanyClicked,
  setIsGuideClicked,
}) => {
  const accompanyButtonHandler = () => {
    setIsAccompanyClicked(true);
    setIsGuideClicked(false);
  };
  const guideButtonHandler = () => {
    setIsGuideClicked(true);
    setIsAccompanyClicked(false);
  };

  return (
    <div className={cx("mySort-container")}>
      <button
        className={cx("accompany-button", {
          "accompany-button-active": isAccompanyClicked,
        })}
        onClick={accompanyButtonHandler}
      >
        동행
      </button>
      <button
        className={cx("guide-button", {
          "guide-button-active": isGuideClicked,
        })}
        onClick={guideButtonHandler}
      >
        가이드
      </button>
    </div>
  );
};

export default MyPostSort;
