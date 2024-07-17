import React, { useEffect, useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import classnames from "classnames/bind";
import styles from "./Map.module.css";

const cx = classnames.bind(styles);

interface Props {
  selected: any;
  placeDetails: any[];
  setPlaceDetails: React.Dispatch<React.SetStateAction<any[]>>;
}

const Map = ({ selected, placeDetails, setPlaceDetails }: Props) => {
  const center = useMemo(() => ({ lat: 37.56667, lng: 126.97806 }), []);

  useEffect(() => {
    const fetchNearbyPlaces = () => {
      const location = selected || center;

      if (location) {
        const geocoder = new window.google.maps.Geocoder();

        // 위도와 경도로 주소 및 place_id 가져오기
        geocoder.geocode({ location }, (geocodeResults, status) => {
          if (
            status === window.google.maps.GeocoderStatus.OK &&
            geocodeResults &&
            geocodeResults[0]
          ) {
            const placeId = geocodeResults[0].place_id;

            // 가져온 place_id 이용해서 검색한 장소 세부 데이터 가져오기
            const service = new window.google.maps.places.PlacesService(
              document.createElement("div")
            );

            service.getDetails(
              { placeId, language: "ko" },
              (placeDetails, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  placeDetails
                ) {
                  const selectedPlace = {
                    placeId: placeDetails.place_id,
                    name: placeDetails.name,
                    address: placeDetails.formatted_address,
                    type: placeDetails.types && placeDetails.types[0],
                    photo:
                      placeDetails.photos && placeDetails.photos[0].getUrl(),
                    distance: 0,
                  };

                  // 검색한 장소의 주변 장소 데이터 가져오기
                  service.nearbySearch(
                    {
                      location,
                      radius: 5000,
                      types: [
                        "restaurant",
                        "cafe",
                        "bar",
                        "park",
                        "museum",
                        "amusement_park",
                        "shopping_mall",
                        "locality",
                        "hotel",
                      ],
                      language: "ko",
                    },
                    (results, status) => {
                      if (
                        results &&
                        status ===
                          window.google.maps.places.PlacesServiceStatus.OK
                      ) {
                        const placesWithDistance = results
                          .map((place) => {
                            if (!place.geometry || !place.geometry.location)
                              return null;

                            const placeLocation = {
                              lat: place.geometry.location.lat(),
                              lng: place.geometry.location.lng(),
                            };

                            const distance =
                              window.google.maps.geometry.spherical.computeDistanceBetween(
                                new window.google.maps.LatLng(
                                  location.lat,
                                  location.lng
                                ),
                                new window.google.maps.LatLng(
                                  placeLocation.lat,
                                  placeLocation.lng
                                )
                              );

                            return {
                              placeId: place.place_id,
                              name: place.name,
                              address:
                                place.formatted_address || place.vicinity,
                              type: place.types && place.types[0],
                              photo: place.photos && place.photos[0].getUrl(),
                              distance,
                            };
                          })
                          .filter(Boolean);

                        // null 값을 제거하고 정렬
                        const validPlaces = placesWithDistance.filter(
                          (place) => place !== null
                        );
                        validPlaces.sort((a, b) => a.distance - b.distance);

                        // 검색한 장소와 그 주변의 장소 데이터 합치기
                        const allPlaces = [selectedPlace, ...validPlaces];

                        setPlaceDetails(allPlaces);
                      } else {
                        console.error("구글 장소 검색 오류:", status);
                      }
                    }
                  );
                } else {
                  console.error("장소 세부 정보 오류:", status);
                }
              }
            );
          } else {
            console.error("선택한 장소 place_id 변환 오류:", status);
          }
        });
      }
    };

    fetchNearbyPlaces();
  }, [selected, center, setPlaceDetails]);
  console.log("셋 플레이스 디테일 정보", placeDetails);

  return (
    <GoogleMap
      zoom={15}
      center={selected || center}
      mapContainerClassName="map-container"
    >
      {selected ? (
        <MarkerF position={selected} />
      ) : (
        <MarkerF position={center} />
      )}
    </GoogleMap>
  );
};

export default Map;
