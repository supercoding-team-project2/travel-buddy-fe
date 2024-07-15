import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import Map from "./Map";
import Places from "./Places";

const MapContainer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if(!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Map />
      <Places />
    </div>
  );
};

export default MapContainer;
