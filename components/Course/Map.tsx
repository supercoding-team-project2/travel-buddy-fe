import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import classnames from "classnames/bind";
import styles from "./Map.module.css";

const cx = classnames.bind(styles);

const Map = () => {
  const center = useMemo(() => ({ lat: 37.5519, lng: 127.9918 }), []);
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default Map;
