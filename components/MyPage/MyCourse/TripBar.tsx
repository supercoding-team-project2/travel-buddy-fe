import Image from "next/image";
import React from "react";

const translationMap: any = {
  RESTAURANT: "/png/restaurant-pin.png",
  CAFE: "/png/cafe.png",
  ATTRACTION: "/png/attraction-pin.png",
  ACCOMMODATION: "/png/hotel-pin.png",
  ETC: "/png/map-pin.png",
};

const translateCategory = (category: any) => {
  return translationMap[category] || category;
};

const koreanCategory = (category: string) => {
  if (category === "RESTAURANT") {
    return "식당";
  }
  if (category === "CAFE") {
    return "카페";
  }
  if (category === "ATTRACTION") {
    return "명소";
  }
  if (category === "ACCOMMODATION") {
    return "숙소";
  }
  return "기타";
};

const LocationItem = ({ name, category, isLast }: any) => {
  const minWidth = name.length * 10 + 100; // 장소/명소/가게의 이름 길이에 따라 기본 너비 조정

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div>
          <div className="flex mb-2" style={{ marginLeft: "-20px" }}>
            <Image
              src={translateCategory(category)}
              alt={category}
              width={50}
              height={50}
            />
          </div>
        </div>
        {isLast ? (
          <div className="relative w-[9rem]  h-[3px]">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[10px] h-[10px] bg-blue-900 rounded-full"></div>
          </div>
        ) : (
          <div
            className="relative  h-[3px] bg-gray-300 dark:bg-slate-500"
            style={{ width: `${minWidth}px` }}
          >
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[10px] h-[10px] bg-blue-900 rounded-full"></div>
          </div>
        )}
      </div>
      <div className="pt-1 pb-8">
        <p className="text-base font-bold text-gray-900 dark:text-slate-300">
          {name}
        </p>
        <p className="text-sm text-gray-600 dark:text-slate-400">
          {koreanCategory(category)}
        </p>
      </div>
    </div>
  );
};

interface Props {
  day: string;
  places: any[];
}
const TripBar = ({ day, places }: Props) => {
  const formatDay = () => {
    const shortDay = day.split("T")[0];
    const splitDay = shortDay.split("-");
    const [year, month, da] = splitDay;
    return `${year}년 ${month}월 ${da}일`;
  };

  return (
    <div className="flex flex-col-reverse p-4 ml-4 w-full mx-auto dark:bg-gray-800">
      <div className="flex flex-col mr-8 my-3">
        <div className="text-base mb-5">{formatDay()}</div>
        <div className="flex ml-3">
          {places.map((place: any, placeIndex: number) => (
            <LocationItem
              key={placeIndex}
              name={place.placeName}
              category={place.placeCategory}
              isLast={placeIndex === places.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripBar;
