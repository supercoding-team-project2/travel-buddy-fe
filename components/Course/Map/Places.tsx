import React, { useState, useCallback, useEffect, useRef } from "react";

import classnames from "classnames/bind";
import styles from "./Places.module.css";

import PlacesAutoComplete from "./PlacesAutoComplete";
import EachPlace from "./EachPlace";

const cx = classnames.bind(styles);

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  placeDetails: any[];
}
const Places = ({ setSelected, placeDetails }: Props) => {
  const placeListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (placeListRef.current) {
      placeListRef.current.scrollTop = 0;
    }
  }, [placeDetails]);

  return (
    <div className={cx("places-container")}>
      <PlacesAutoComplete setSelected={setSelected} />
      <div className={cx("place-list-container")} ref={placeListRef}>
        {placeDetails?.length > 0 &&
          placeDetails.map((place) => {
            return (
              <EachPlace
                key={place.placeId}
                placeId={place.placeId}
                name={place.name}
                address={place.address}
                type={place.type}
                photo={place.photo}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Places;
