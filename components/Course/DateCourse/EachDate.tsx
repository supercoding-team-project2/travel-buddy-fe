import React, { useState } from "react";
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

// Slider prev, next arrow components
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
  dateData: { [date: string]: any[] };
  setIsDateConfirmed: React.Dispatch<React.SetStateAction<{}>>;
}

const EachDate = ({ date, dateData, setIsDateConfirmed }: Props) => {
  const isoDate = date.toISOString().split("T")[0];
  const places = dateData[isoDate] || [];

  const [isConfirmed, setIsConfirmed] = useState(false);

  // Format date
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateFormatted = date.getDate();
  const formattedDate = `${year}년 ${month}월 ${dateFormatted}일`;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, places.length),
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: places.length >= 3 ? <PrevArrow /> : undefined,
    nextArrow: places.length >= 3 ? <NextArrow /> : undefined,
  };

  // Confirm date
  const handleConfirm = () => {
    const formattedDate = date.toISOString().split("T")[0];
    setIsDateConfirmed((prev) => ({
      ...prev,
      [formattedDate]: true,
    }));
    setIsConfirmed(true);
  };

  console.log(places, "장소");

  if (places.length === 0) return null;

  return (
    <div className={cx("each-date-container")}>
      <div className={cx("date")}>{formattedDate}</div>
      <div className={cx("slider-container")}>
        <Slider {...settings}>
          {places.map((place) => (
            <div className={cx("place-container")} key={place.id}>
              <Image src={cafe} alt="place" className={cx("place-image")} />
              <div className={cx("place-detail-container")}>
                <div className={cx("place-name")}>{place.name}</div>
                <div className={cx("place-category")}>{place.category}</div>
                <div className={cx("place-intro")}>{place.intro}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={cx("button-container")}>
        {isConfirmed ? (
          <button className={cx("confirmed-button")} disabled>
            완료
          </button>
        ) : (
          <button className={cx("confirm-button")} onClick={handleConfirm}>
            확인
          </button>
        )}
      </div>
    </div>
  );
};

export default EachDate;
