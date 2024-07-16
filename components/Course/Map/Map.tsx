import React, { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

import classnames from "classnames/bind";
import styles from "./Map.module.css";

const cx = classnames.bind(styles);

const Map = () => {
  const center = useMemo(() => ({ lat: 37.56667, lng: 126.97806 }), []);
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default Map;
