import React, { useState, useCallback, useEffect, useRef } from "react";

import classnames from "classnames/bind";
import styles from "./Places.module.css";

import PlacesAutoComplete from "./PlacesAutoComplete";
import EachPlace from "./EachPlace";

const cx = classnames.bind(styles);

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  placeDetails: any[];
  setIsNewSelection: React.Dispatch<React.SetStateAction<boolean>>;
}
const Places = ({ setSelected, placeDetails, setIsNewSelection }: Props) => {
  const placeListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (placeListRef.current) {
      placeListRef.current.scrollTop = 0;
    }
  }, [placeDetails]);

  return (
    <div className={cx("places-container")}>
      <PlacesAutoComplete setSelected={setSelected}  setIsNewSelection={setIsNewSelection}/>
      <div className={cx("place-list-container")} ref={placeListRef}>
        {placeDetails?.length > 0 &&
          placeDetails.map((place) => {
            return (
              <EachPlace
                setSelected={setSelected}
                setIsNewSelection={setIsNewSelection}
                key={place.placeId}
                placeId={place.placeId}
                name={place.name}
                address={place.address}
                type={place.type}
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
