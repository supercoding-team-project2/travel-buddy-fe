import React, { useState, useEffect } from "react";
import { DateRangePickerProps } from "react-date-range";

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
  types: string[];
  photo: string;
  location: {};
  dateData: { [date: string]: any[] };
  dateRange: DateRangePickerProps["ranges"];
  isDateConfirmed: { [date: string]: boolean };
  isSaved: { [placeId: string]: boolean };
  setIsSaved: React.Dispatch<
    React.SetStateAction<{ [placeId: string]: boolean }>
  >;
  setDateData: React.Dispatch<React.SetStateAction<{ [date: string]: any[] }>>;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  setIsNewSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

const EachPlace = ({
  placeId,
  name,
  address,
  types,
  photo,
  location,
  dateData,
  dateRange,
  isDateConfirmed,
  isSaved,
  setIsSaved,
  setDateData,
  setSelected,
  setIsNewSelection,
}: Props) => {
  const [category, setCategory] = useState("");

  const photoSrc = photo ? photo : noImage;

  //받은 데이터가 어느 카테고리에 들어가는지 확인하는 로직
  const restaurant = ["restaurant", "food"];
  const cafe = ["cafe", "bakery", "coffee_shop"];
  const accommodation = ["lodging", "hotel", "hostel", "motel"];
  const attraction = [
    "locality",
    "point_of_interest",
    "establishment",
    "museum",
    "park",
    "amusement_park",
    "shopping_mall",
  ];

  const getPlaceCategory = (types: string[]) => {
    if (types.some((type) => cafe.includes(type))) {
      return setCategory("카페");
    }
    if (types.some((type) => restaurant.includes(type))) {
      return setCategory("음식점");
    }
    if (types.some((type) => accommodation.includes(type))) {
      return setCategory("숙소");
    }
    if (types.some((type) => attraction.includes(type))) {
      return setCategory("명소");
    }
    return "기타";
  };

  //useEffect : 카테고리 정하기
  useEffect(() => {
    getPlaceCategory(types);
  }, [types]);

  //+버튼을 눌렀을 때, 장소를 날짜별로 저장하는 로직
  const handleSave = () => {
    if (!dateRange || dateRange.length === 0) return;

    const startDate = dateRange[0]?.startDate;
    const endDate = dateRange[0]?.endDate;

    if (!startDate || !endDate) return;

    let currentDate = new Date(startDate);
    const newDateData = { ...dateData };

    while (currentDate <= endDate) {
      const formattedCurrentDate = currentDate.toISOString().split("T")[0];

      if (!newDateData[formattedCurrentDate]) {
        newDateData[formattedCurrentDate] = [];
      }

      if (!isDateConfirmed[formattedCurrentDate]) {
        newDateData[formattedCurrentDate].push({
          placeId,
          name,
          address,
          category,
          photo,
        });
        break;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    //모든 일자의 완료 버튼을 눌렀을시, 추가 저장 막기
    let lastDate = new Date(endDate as Date);
    const formattedEndDate = lastDate.toISOString().split("T")[0];
    if (isDateConfirmed[formattedEndDate]) {
      alert("이미 모든 경로 저장을 완료했습니다.");
      return;
    }

    setDateData(newDateData);
    setIsSaved((prev) => ({ ...prev, [placeId]: true }));
  };

  return (
    <div
      className={cx("each-place-container")}
      onClick={() => {
        setIsNewSelection(false);
        setSelected(location);
      }}
    >
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
        <div className={cx("type")}>{category}</div>
      </div>
      <button className={cx("button-container")}>
        {isSaved[placeId] ? (
          <Image src={check} alt="check-icon" className={cx("check-icon")} />
        ) : (
          <Image
            src={save}
            alt="save-icon"
            className={cx("save-icon")}
            onClick={handleSave}
          />
        )}
      </button>
    </div>
  );
};

export default EachPlace;
