import Image from "next/image";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkbox = () => {
  const [participants, setParticipants] = useState<number>(1);
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string>("");

  const decreaseparticipant = () => {
    if (participants) {
      setParticipants((prev) => prev - 1);
    }
  };

  const increaseparticipant = () => {
    if (participants) {
      setParticipants((prev) => prev + 1);
    }
  };

  const handleAgeMinChange = (e: any) => {
    setAgeMin(e.target.value);
    console.log("🚀 ~ Checkbox ~ ageMin:", ageMin);
  };

  const handleAgeMaxChange = (e: any) => {
    setAgeMax(e.target.value);
    console.log("🚀 ~ Checkbox ~ ageMax:", ageMax);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
    console.log("🚀 ~ Checkbox ~ gender:", value);
  };

  return (
    <div className=" border p-4 w-[20rem]">
      <div className="flex gap-5">
        <label>연령대</label>
        <div>
          <input
            placeholder="min"
            className="w-14 border rounded"
            value={ageMin ?? ""}
            onChange={handleAgeMinChange}
          />{" "}
          ⁓{" "}
          <input
            placeholder="max"
            value={ageMax ?? ""}
            onChange={handleAgeMaxChange}
            className="w-14 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-5 my-4">
        <label>참여인원</label>
        <div
          className="flex border px-2 rounded gap-2"
          style={{ backgroundColor: "#c3d8e6" }}
        >
          <button onClick={decreaseparticipant} disabled={participants === 1}>
            <Image src="/svg/minus.svg" alt="감소버튼" width="20" height="20" />
          </button>
          <div className="quantity-text">{participants}</div>
          <button
            onClick={increaseparticipant}
            //   disabled={participants >= maxParticipants}
          >
            <Image src="/svg/plus.svg" alt="증가버튼" width="20" height="20" />
          </button>
        </div>
      </div>
      <div className="flex gap-5">
        <label>성별</label>
        <RadioGroup
          defaultValue="option-one"
          className="flex"
          value={gender}
          onValueChange={handleGenderChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="남성" id="option-one" />
            <Label htmlFor="option-one">남성</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="여성" id="option-two" />
            <Label htmlFor="option-two">여성</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="무관" id="option-third" />
            <Label htmlFor="option-two">무관</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Checkbox;
