import React, { useEffect, useRef } from "react";
import { DateRangePickerProps } from "react-date-range";

import classnames from "classnames/bind";
import styles from "./Places.module.css";

import PlacesAutoComplete from "./PlacesAutoComplete";
import EachPlace from "./EachPlace";

const cx = classnames.bind(styles);

interface Props {
  dateData: { [date: string]: any[] };
  dateRange: DateRangePickerProps["ranges"];
  isDateConfirmed: {};
  placeDetails: any[];
  isSaved: { [placeId: string]: boolean };
  setIsSaved: React.Dispatch<
    React.SetStateAction<{ [placeId: string]: boolean }>
  >;
  setDateData: React.Dispatch<React.SetStateAction<{ [date: string]: any[] }>>;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  setIsNewSelection: React.Dispatch<React.SetStateAction<boolean>>;
}
const Places = ({
  dateData,
  dateRange,
  isDateConfirmed,
  placeDetails,
  isSaved,
  setIsSaved,
  setDateData,
  setSelected,
  setIsNewSelection,
}: Props) => {
  const placeListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (placeListRef.current) {
      placeListRef.current.scrollTop = 0;
    }
  }, [placeDetails]);

  return (
    <div className={cx("places-container")}>
      <PlacesAutoComplete
        setSelected={setSelected}
        setIsNewSelection={setIsNewSelection}
      />
      <div className={cx("place-list-container")} ref={placeListRef}>
        {placeDetails?.length > 0 &&
          placeDetails.map((place) => {
            return (
              <EachPlace
                dateData={dateData}
                dateRange={dateRange}
                isDateConfirmed={isDateConfirmed}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                setDateData={setDateData}
                setSelected={setSelected}
                setIsNewSelection={setIsNewSelection}
                key={place.placeId}
                placeId={place.placeId}
                name={place.name}
                address={place.address}
                types={place.types}
                photo={place.photo}
                location={place.location}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Places;
