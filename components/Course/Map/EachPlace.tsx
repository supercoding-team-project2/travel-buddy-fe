import React, { useState } from "react";

import classnames from "classnames/bind";
import styles from "./EachPlace.module.css";

import Image from "next/image";
import noImage from "@/assets/noPhoto.png";
import save from "@/assets/save.png";
import check from "@/assets/check.png";

const cx = classnames.bind(styles);

interface Props {
  placeId: string;
  name: string;
  address: string;
  type: string;
  photo: string;
}
const EachPlace = ({ placeId, name, address, type, photo }: Props) => {
  const [isSaved, setIsSaved] = useState(false);

  const photoSrc = photo ? photo : noImage;
  const showType = type === "street_address" ? "" : type;
  return (
    <div className={cx("each-place-container")}>
      <Image
        src={photoSrc}
        alt="place-photo"
        className={cx("place-photo")}
        width={100}
        height={100}
      />
      <div className={cx("info-container")}>
        <div className={cx("name")}>{name}</div>
        <div className={cx("address")}>{address}</div>
        <div className={cx("type")}>{showType}</div>
      </div>
      <button className={cx("button-container")}>
        {isSaved ? (
          <Image src={check} alt="check-icon" className={cx("check-icon")} />
        ) : (
          <Image
            src={save}
            alt="save-icon"
            className={cx("save-icon")}
            onClick={() => setIsSaved(true)}
          />
        )}
      </button>
    </div>
  );
};

export default EachPlace;
