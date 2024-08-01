import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatDateString from "../PostDetail/formatDateString";
import TripBar from "@/components/MyPage/MyCourse/TripBar";

const EditList = ({
  data,
  onSelectChange,
}: {
  data: any[];
  onSelectChange: any;
}) => {
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [selectedTripName, setSelectedTripName] = useState<string | null>(null);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const handleSelectChange = (tripName: string) => {
    const selected = data.find((trip) => trip.title === tripName);
    setSelectedTrip(selected || null);
    setSelectedTripName(tripName);
    if (selected) {
      setSelectedTripId(selected.routeId);
    } else {
      setSelectedTripId(null);
    }
  };

  useEffect(() => {
    if (selectedTrip) {
      const startDate = formatDateString(selectedTrip.startAt);
      const endDate = formatDateString(selectedTrip.endAt);
    }
    if (onSelectChange) {
      onSelectChange(selectedTripId);
    }
  }, [selectedTrip]);

  return (
    <div className="my-10">
      <div className="flex mb-2 gap-10">
        <div>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] border-gray-500">
              <SelectValue placeholder="내 경로 리스트" />
            </SelectTrigger>
            <SelectContent>
              {data.length === 0 ? (
                <div>경로를 선택해 주세요</div>
              ) : (
                data.map((trip) => (
                  <SelectItem key={trip.title} value={trip.title}>
                    {trip.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        {selectedTrip && (
          <div>
            <p>
              {formatDateString(selectedTrip.startAt)} ~{" "}
              {formatDateString(selectedTrip.endAt)}
            </p>
          </div>
        )}
      </div>
      <div className="border">
        {selectedTrip ? (
          selectedTrip.days.length > 0 ? (
            selectedTrip.days.map((eachDay: { day: string; places: any[] }) => (
              <TripBar
                key={eachDay.day}
                day={eachDay.day}
                places={eachDay.places}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center my-4">일정이 없습니다.</p>
          )
        ) : (
          <p className="text-gray-600 text-center my-4">
            경로를 선택해 주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default EditList;
