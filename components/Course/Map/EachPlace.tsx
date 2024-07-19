import React, { useState, useEffect } from "react";
import { DateRangePickerProps } from "react-date-range";

import classnames from "classnames/bind";
import styles from "./EachPlace.module.css";

import Image from "next/image";
import noImage from "@/assets/noPhoto.png";
import save from "@/assets/save.png";
import check from "@/assets/check.png";
import { previousDay } from "date-fns";

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
  isDateConfirmed: { [date: string]: boolean }; // 날짜와 확인 여부를 저장하는 객체
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
  setDateData,
  setSelected,
  setIsNewSelection,
}: Props) => {
  const [isSaved, setIsSaved] = useState(false);
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

  //장소를 저장했을 때 실행하는 로직
  const handleSave = () => {
    if (!dateRange || dateRange.length === 0) return;

    const startDate = dateRange[0]?.startDate;
    const endDate = dateRange[0]?.endDate;

    if (!startDate || !endDate) return;

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const newDateData = { ...dateData };

    let currentDate = new Date(startDate);

    console.log("Initial Date Data:", newDateData);

    if (!newDateData[formattedStartDate]) {
      newDateData[formattedStartDate] = [];
    }

    if (!isDateConfirmed[formattedStartDate]) {
      newDateData[formattedStartDate].push({
        placeId,
        name,
        address,
        category,
        photo,
      });
    }

    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split("T")[0];

      if (!newDateData[dateKey]) {
        newDateData[dateKey] = [];
      }

      if (!isDateConfirmed[dateKey]) {
        newDateData[dateKey].push({
          placeId,
          name,
          address,
          category,
          photo,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log("Updated Date Data:", newDateData);

    setDateData(newDateData);
    setIsSaved(true);
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
        {isSaved ? (
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
