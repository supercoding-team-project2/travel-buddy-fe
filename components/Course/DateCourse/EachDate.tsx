import React, { useRef } from "react";
import Slider from "react-slick";
import "./Slick.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classnames from "classnames/bind";
import styles from "./EachDate.module.css";

import Image from "next/image";
import prev from "@/assets/prev.png";
import next from "@/assets/next.png";
import cafe from "@/assets/cafe.png";

const cx = classnames.bind(styles);

//slider prev, next arrow component
function PrevArrow(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={cx("prev-container")}>
      <Image src={prev} alt="prev" className={cx("prev-icon")} />
    </div>
  );
}

function NextArrow(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={cx("next-container")}>
      <Image src={next} alt="next" className={cx("next-icon")} />
    </div>
  );
}

interface Props {
  date: Date;
}

const EachDate = ({ date }: Props) => {
  //format date
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateFormatted = date.getDate();
  const formattedDate = `${year}년 ${month}월 ${dateFormatted}일`;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div>{formattedDate}</div>
      <div className={cx("slider-container")}>
        <Slider {...settings}>
          <div className={cx("place-container")}>
            <Image src={cafe} alt="place" className={cx("place-image")} />
            <div className={cx("place-detail-container")}></div>
            <div>좋은 카페</div>
            <div>카페</div>
          </div>
          <div className={cx("place-container")}>
            <Image src={cafe} alt="place" className={cx("place-image")} />
            <div className={cx("place-detail-container")}></div>
            <div>좋은 카페</div>
            <div>카페</div>
          </div>
          <div className={cx("place-container")}>
            <Image src={cafe} alt="place" className={cx("place-image")} />
            <div className={cx("place-detail-container")}></div>
            <div>좋은 카페</div>
            <div>카페</div>
          </div>
          <div className={cx("place-container")}>
            <Image src={cafe} alt="place" className={cx("place-image")} />
            <div className={cx("place-detail-container")}></div>
            <div>좋은 카페</div>
            <div>카페</div>
          </div>
          <div className={cx("place-container")}>
            <Image src={cafe} alt="place" className={cx("place-image")} />
            <div className={cx("place-detail-container")}></div>
            <div>좋은 카페</div>
            <div>카페</div>
          </div>
          <div className={cx("place-container")}>
            <Image src={cafe} alt="place" className={cx("place-image")} />
            <div className={cx("place-detail-container")}></div>
            <div>좋은 카페</div>
            <div>카페</div>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default EachDate;
