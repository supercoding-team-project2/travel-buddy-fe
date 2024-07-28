import React from "react";
import classnames from "classnames/bind";
import styles from "./CourseDoubleDelete.module.css";

const cx = classnames.bind(styles);

const CourseDoubleDelete = () => {
  return (
    <div className={cx("double-delete-overlays")}>
      <div className={cx("double-delete-container")}>open</div>
    </div>
  );
};

export default CourseDoubleDelete;
