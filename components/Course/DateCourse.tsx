import React from "react";

import classnames from "classnames/bind";
import styles from "./DateCourse.module.css";

const cx = classnames.bind(styles);

const DateCourse: React.FC = () => {
  return (
    <div className={cx("date-course-container")}>
      <div>날짜와 장소 컨테이너</div>
      <div className={cx("memo-button-container")}>
      <textarea className={cx("memo-container")} placeholder="이 여행 경로에 대한 메모 작성하기"></textarea>
      <div className={cx("button-container")}>
        <button className={cx("cancel-button")}>취소</button>
        <button className={cx("save-button")}>저장</button>
      </div>
      </div>
    </div>
  );
};

export default DateCourse;
