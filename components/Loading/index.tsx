import React from "react";
import classnames from "classnames/bind";
import styles from "./Loading.module.css";

const cx = classnames.bind(styles);

const Loading = () => {
  return (
    <div className={cx("loading-container")}>
      <img src="/gif/loading-1.gif" alt="Loading..." className={cx("loading-icon")}/>
    </div>
  );
};

export default Loading;
