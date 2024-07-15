"use client";

import React, { useState } from "react";
import MapContainer from "../../../components/Course/MapContainer";
import CalendarModal from "../../../components/Course/CalendarModal";

const CourseClient = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    return (
      <>
        <CalendarModal
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
        />
        <MapContainer />
      </>
    );
};

export default CourseClient;
