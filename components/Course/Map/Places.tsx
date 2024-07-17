import React from "react";

import classnames from "classnames/bind";
import styles from "./Places.module.css";

import Image from "next/image"
import search from "@/assets/search.png"

const cx = classnames.bind(styles);

const Places = () => {
  return <div className={cx("places-container")}>
    <div className={cx("search-container")}>
    <input className={cx("search-input")} placeholder="여행 장소 검색하기"/>
    <Image src={search} alt="search" className={cx("search-icon")}/>
    </div>
    <div>places를 두는 공간</div></div>;
};

export default Places;
