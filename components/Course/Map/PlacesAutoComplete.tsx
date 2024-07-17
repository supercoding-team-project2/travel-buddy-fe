import React, { useRef } from "react";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "./PlacesAutoComplete.css";
import "@reach/combobox/styles.css";
import Image from "next/image";
import search from "@/assets/search.png";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

const PlacesAutoComplete = ({ setSelected }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({ requestOptions: { language: "ko" } });

  //when choose one of the places from the combobox list
  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    setSelected({ lat, lng });
  };

  //when press enter on input
  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value) {
        await handleSelect(value);
      }
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleInputEnter}
        disabled={!ready}
        placeholder="여행지 검색 / 주변 장소 탐색"
        className="combobox-input"
      />
      <Image
        src={search}
        alt="search"
        className="search-icon"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutoComplete;
