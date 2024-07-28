import React from "react";
import classnames from "classnames/bind";
import styles from "./Loading.module.css";
import Image from "next/image";
import loading from "@/assets/loading.png";

const cx = classnames.bind(styles);

const Loading = () => {
  return (
    <div className={cx("loading-container")}>
      <Image src={loading} alt="loading-img" className={cx("loading-icon")} />
    </div>
  );
};

export default Loading;
