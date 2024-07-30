"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DateRangePickerProps } from "react-date-range";

import MapContainer from "@/components/Course/Map/MapContainer";
import CalendarModal from "@/components/Course/CalendarModal/CalendarModal";
import DateCourse from "@/components/Course/DateCourse/DateCourse";
import { devNull } from "os";

const CourseClient = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSaved, setIsSaved] = useState<{ [placeId: string]: boolean }>({});
  const [dateRange, setDateRange] = useState<DateRangePickerProps["ranges"]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [dateData, setDateData] = useState<{ [date: string]: any[] }>({});
  const [isDateConfirmed, setIsDateConfirmed] = useState({});
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      setToken(localToken);

      if (!localToken) {
        router.push("/login");
      }
    }
  }, []);

  return (
    <>
      <CalendarModal
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <MapContainer
        title={title}
        dateData={dateData}
        dateRange={dateRange}
        isDateConfirmed={isDateConfirmed}
        isSaved={isSaved}
        setTitle={setTitle}
        setIsSaved={setIsSaved}
        setDateData={setDateData}
      />
      <DateCourse
        title={title}
        dateData={dateData}
        setDateData={setDateData}
        dateRange={dateRange}
        setIsDateConfirmed={setIsDateConfirmed}
        setIsSaved={setIsSaved}
        token={token}
      />
    </>
  );
};

export default CourseClient;
