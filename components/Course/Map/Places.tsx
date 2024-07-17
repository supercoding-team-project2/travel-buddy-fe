import React, { useState } from "react";

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
  return (
    <div className={cx("places-container")}>
      <PlacesAutoComplete setSelected={setSelected} />
      <div className={cx("place-list-container")}>
        {placeDetails?.length > 0 &&
          placeDetails.map((place) => {
            return <EachPlace name={place.name} address={place.address} types={place.types} photo={photo}/>;
          })}
      </div>
    </div>
  );
};

export default Places;
