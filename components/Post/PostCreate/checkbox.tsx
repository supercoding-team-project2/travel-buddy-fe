import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckboxData {
  ageMin: number | undefined;
  ageMax: number | undefined;
  participants: number;
  gender: string;
}

interface CheckboxProps {
  onChange?: (data: CheckboxData) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange }) => {
  const [participants, setParticipants] = useState<number>(1);
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string>("");

  useEffect(() => {
    if (onChange) {
      onChange({ ageMin, ageMax, participants, gender });
    }
  }, [ageMin, ageMax, participants, gender]);

  const decreaseParticipant = () => {
    if (participants > 1) {
      setParticipants((prev) => prev - 1);
    }
  };

  const increaseParticipant = () => {
    setParticipants((prev) => prev + 1);
  };

  const handleAgeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMin(e.target.value ? Number(e.target.value) : undefined);
  };

  const handleAgeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMax(e.target.value ? Number(e.target.value) : undefined);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  return (
    <div className="border p-4 w-[20rem]">
      <div className="flex gap-5">
        <label>연령대</label>
        <div>
          <input
            placeholder="min"
            className="w-14 border border-gray-300 rounded focus:border-blue-500"
            value={ageMin ?? ""}
            onChange={handleAgeMinChange}
          />{" "}
          ⁓{" "}
          <input
            placeholder="max"
            value={ageMax ?? ""}
            onChange={handleAgeMaxChange}
            className="w-14 border border-gray-300 rounded focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-5 my-4">
        <label>참여인원</label>
        <div
          className="flex border px-2 rounded gap-2"
          style={{ backgroundColor: "#c3d8e6" }}
        >
          <button onClick={decreaseParticipant} disabled={participants === 1}>
            <Image src="/svg/minus.svg" alt="감소버튼" width="20" height="20" />
          </button>
          <div className="quantity-text">{participants}</div>
          <button onClick={increaseParticipant}>
            <Image src="/svg/plus.svg" alt="증가버튼" width="20" height="20" />
          </button>
        </div>
      </div>
      <div className="flex gap-5">
        <label>성별</label>
        <RadioGroup
          value={gender}
          onValueChange={handleGenderChange}
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MALE" id="option-one" />
            <Label htmlFor="option-one">남성</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FEMALE" id="option-two" />
            <Label htmlFor="option-two">여성</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ALL" id="option-third" />
            <Label htmlFor="option-third">무관</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Checkbox;
