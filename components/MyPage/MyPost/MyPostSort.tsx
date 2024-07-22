import React from "react";
import axios from "axios";

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
  setPostData: React.Dispatch<React.SetStateAction<any[]>>;
}

const MyPostSort: React.FC<Props> = ({
  isReviewClicked,
  setIsReviewClicked,
  isAccompanyClicked,
  isGuideClicked,
  setIsAccompanyClicked,
  setIsGuideClicked,
  setPostData,
}) => {
  const buttonHandler = (type: string) => {
    setIsReviewClicked(type === "review");
    setIsAccompanyClicked(type === "accompany");
    setIsGuideClicked(type === "guide");

    //매개변수 type에 맞는 걸로 axios get 요청 & url에 type 넣기
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   axios
    //     .get("url", { headers: { Authorization: `Bearer ${accessToken}` } })
    //     .then((response) => {
    //       console.log("내 카테고리 게시글 조회 데이터", response.data);
    //       setPostData(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("내 카테고리 게시글 조회 요청 실패", error);
    //     });
    // }
  };

  return (
    <div className={cx("mySort-container")}>
      <button
        className={cx("review-button", {
          "review-button-active": isReviewClicked,
        })}
        onClick={() => buttonHandler("review")}
      >
        후기
      </button>
      <button
        className={cx("accompany-button", {
          "accompany-button-active": isAccompanyClicked,
        })}
        onClick={() => buttonHandler("accompany")}
      >
        동행
      </button>
      <button
        className={cx("guide-button", {
          "guide-button-active": isGuideClicked,
        })}
        onClick={() => buttonHandler("guide")}
      >
        가이드
      </button>
    </div>
  );
};

export default MyPostSort;
