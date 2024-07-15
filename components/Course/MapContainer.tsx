import React from "react";
import { useLoadScript } from "@react-google-maps/api";

import Map from "./Map";
import Places from "./Places";

import classnames from "classnames/bind";
import styles from "./MapContainer.module.css";

const cx = classnames.bind(styles);

const MapContainer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={cx("entire-map-container")}>
      <input className={cx("course-title")} placeholder="제목" required/>
      <div className={cx("place-map-container")}>
        <Places />
        <Map />
      </div>
    </div>
  );
};

export default MapContainer;
