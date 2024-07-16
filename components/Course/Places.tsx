import React from "react";

import classnames from "classnames/bind";
import styles from "./Places.module.css";

const cx = classnames.bind(styles);

const Places = () => {
  return <div className={cx("places-container")}>places를 두는 공간</div>;
};

export default Places;
