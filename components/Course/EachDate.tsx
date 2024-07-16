import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./EachDate.module.css";

const cx = classnames.bind(styles);

interface Props {
  date: Date;
}

const EachDate = ({ date }: Props) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateFormatted = date.getDate();

  const formattedDate = `${year}년 ${month}월 ${dateFormatted}일`;

  return (
    <>
      <div>{formattedDate}</div>
      <div className={cx("place-card-container")}></div>
    </>
  );
};

export default EachDate;
