import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TravelBar from "../PostDetail/TravelBar";
import { TripData } from "./interfaces";
import formatDateString from "../PostDetail/formatDateString";

const EditList = ({
  data,
  onSelectChange,
}: {
  data: TripData[];
  onSelectChange: any;
}) => {
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const [selectedTripName, setSelectedTripName] = useState<string | null>(null);

  const handleSelectChange = (tripName: string) => {
    const selected = data.find((trip) => trip.tripName === tripName);
    setSelectedTrip(selected || null);
    setSelectedTripName(tripName);
  };

  useEffect(() => {
    if (selectedTrip) {
      const startDate = formatDateString(selectedTrip.route.startAt);
      const endDate = formatDateString(selectedTrip.route.endAt);
    }
    if (onSelectChange) {
      onSelectChange(selectedTripName);
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
                <SelectItem key={trip.tripName} value={trip.tripName}>
                  {trip.tripName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedTrip && (
          <div>
            <p>
              {formatDateString(selectedTrip.route.startAt)} ~{" "}
              {formatDateString(selectedTrip.route.endAt)}
            </p>
          </div>
        )}
      </div>
      <div className="border">
        {selectedTrip && <TravelBar route={selectedTrip.route} />}
      </div>
    </div>
  );
};

export default EditList;
