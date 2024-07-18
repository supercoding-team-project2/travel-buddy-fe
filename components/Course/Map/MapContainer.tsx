import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import Map from "./Map";
import Places from "./Places";

import classnames from "classnames/bind";
import styles from "./MapContainer.module.css";

const cx = classnames.bind(styles);
const LIBRARIES: any[] = ["places", "geometry"];

const MapContainer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [selected, setSelected] = useState<any>(null);
  const [placeDetails, setPlaceDetails] = useState<any[]>([]);
  const [isNewSelection, setIsNewSelection] = useState(true);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={cx("entire-map-container")}>
      <input className={cx("course-title")} placeholder="제목" required />
      <div className={cx("place-map-container")}>
        <Places
          setSelected={setSelected}
          placeDetails={placeDetails}
          setIsNewSelection={setIsNewSelection}
        />
        <Map
          selected={selected}
          setPlaceDetails={setPlaceDetails}
          placeDetails={placeDetails}
          isNewSelection={isNewSelection}
        />
      </div>
    </div>
  );
};

export default MapContainer;
