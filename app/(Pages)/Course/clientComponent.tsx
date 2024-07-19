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
  const [dateData, setDateData] = useState<{ [date: string]: any[] }>({});
  const [isDateConfirmed, setIsDateConfirmed] = useState({});

  return (
    <>
      <CalendarModal
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <MapContainer
        dateData={dateData}
        setDateData={setDateData}
        dateRange={dateRange}
        isDateConfirmed={isDateConfirmed}
      />
      <DateCourse
        dateRange={dateRange}
        dateData={dateData}
        setIsDateConfirmed={setIsDateConfirmed}
      />
    </>
  );
};

export default CourseClient;
