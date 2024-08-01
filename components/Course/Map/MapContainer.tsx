import React, { useState, ChangeEvent } from "react";
import { DateRangePickerProps } from "react-date-range";
import { useLoadScript } from "@react-google-maps/api";

import Map from "./Map";
import Places from "./Places";

import classnames from "classnames/bind";
import styles from "./MapContainer.module.css";

const cx = classnames.bind(styles);
const LIBRARIES: any[] = ["places", "geometry"];

interface Props {
  title: string;
  dateData: { [date: string]: any[] };
  dateRange: DateRangePickerProps["ranges"];
  isDateConfirmed: {};
  isSaved: { [placeId: string]: boolean };
  titleInvalid: boolean;
  titleRef: React.RefObject<HTMLInputElement>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTitleInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaved: React.Dispatch<
    React.SetStateAction<{ [placeId: string]: boolean }>
  >;
  setDateData: React.Dispatch<React.SetStateAction<{ [date: string]: any[] }>>;
}
const MapContainer = ({
  title,
  dateData,
  dateRange,
  isDateConfirmed,
  isSaved,
  titleInvalid,
  titleRef,
  setTitle,
  setTitleInvalid,
  setIsSaved,
  setDateData,
}: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [selected, setSelected] = useState<any>(null);
  const [placeDetails, setPlaceDetails] = useState<any[]>([]);
  const [isNewSelection, setIsNewSelection] = useState(true);

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTitle(inputValue);

    if (inputValue.trim().length >= 1) {
      setTitleInvalid(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={cx("entire-map-container")}>
      {titleInvalid && (
        <div className={cx("title-validation")}>
          최소 1글자 이상의 제목을 작성해주세요.
        </div>
      )}
      <input
        className={cx("course-title")}
        placeholder="제목"
        value={title}
        onChange={titleChangeHandler}
        ref={titleRef}
        required
      />
      <div className={cx("place-map-container")}>
        <Places
          dateData={dateData}
          dateRange={dateRange}
          isDateConfirmed={isDateConfirmed}
          setDateData={setDateData}
          setSelected={setSelected}
          placeDetails={placeDetails}
          setIsNewSelection={setIsNewSelection}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
        />
        <Map
          selected={selected}
          setSelected={setSelected}
          setPlaceDetails={setPlaceDetails}
          placeDetails={placeDetails}
          isNewSelection={isNewSelection}
        />
      </div>
    </div>
  );
};

export default MapContainer;
