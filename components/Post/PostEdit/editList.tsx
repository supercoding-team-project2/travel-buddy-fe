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
              {data.map((trip) => (
                <SelectItem key={trip.title} value={trip.title}>
                  {trip.title}
                </SelectItem>
              ))}
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
        {selectedTrip &&
          selectedTrip.days.map((eachDay: { day: string; places: any[] }) => {
            return (
              <TripBar
                key={eachDay.day}
                day={eachDay.day}
                places={eachDay.places}
              />
            );
          })}
      </div>
    </div>
  );
};

export default EditList;
