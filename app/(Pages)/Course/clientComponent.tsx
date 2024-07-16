"use client";

import React, { useState } from "react";
import { DateRangePickerProps } from "react-date-range";

import MapContainer from "@/components/Course/Map/MapContainer";
import CalendarModal from "@/components/Course/CalendarModal/CalendarModal";
import DateCourse from "@/components/Course/DateCourse/DateCourse";

const CourseClient = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  //date range state
  const [dateRange, setDateRange] = useState<DateRangePickerProps["ranges"]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <CalendarModal
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <MapContainer />
      <DateCourse dateRange={dateRange} />
    </>
  );
};

export default CourseClient;
