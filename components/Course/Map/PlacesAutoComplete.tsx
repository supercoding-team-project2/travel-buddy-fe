import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Image from "next/image";

import "./PlacesAutoComplete.css";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  setIsNewSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlacesAutoComplete = ({ setSelected, setIsNewSelection }: Props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      language: "ko",
      componentRestrictions: { country: "KR" },
    },
  });

  const handleSelect = async (
    event: React.ChangeEvent<{}>,
    address: string | null
  ) => {
    if (address) {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address: address });
      const { lat, lng } = await getLatLng(results[0]);

      setSelected({ lat, lng });
      setIsNewSelection(true);
    }
    clearSuggestions();
  };

  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value) {
        setSelected(value);
      }
    }
    clearSuggestions();
  };

  return (
    <div className="autocomplete-container">
    <Autocomplete
      freeSolo
      disableClearable
       className="combobox-input-container"
      value={value}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      options={
        status === "OK" ? data.map(({ description }) => description) : []
      }
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="여행지 검색 / 주변 장소 탐색"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          fullWidth
          disabled={!ready}
          onKeyDown={handleInputEnter}
          className="combobox-input"
        />
      )}
      style={{ flexGrow: 1 }}
    />
    </div>
  );
};

export default PlacesAutoComplete;