import React, { useState, useEffect } from "react";
import { DateRangePickerProps } from "react-date-range";
import EachDate from "./EachDate";
import classnames from "classnames/bind";
import styles from "./DateCourse.module.css";

const cx = classnames.bind(styles);

interface Props {
  dateRange: DateRangePickerProps["ranges"];
  dateData: { [date: string]: any[] };
  setDateData: React.Dispatch<React.SetStateAction<{ [date: string]: any[] }>>;
  setIsDateConfirmed: React.Dispatch<React.SetStateAction<{}>>;
  setIsSaved: React.Dispatch<
    React.SetStateAction<{ [placeId: string]: boolean }>
  >;
}

const DateCourse = ({
  dateRange,
  dateData,
  setDateData,
  setIsDateConfirmed,
  setIsSaved,
}: Props) => {
  const [dates, setDates] = useState<Date[]>([]);

  const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    const dates: any = [];

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  //get dates between startDate and endDate at the first render
  useEffect(() => {
    if (dateRange && dateRange.length > 0) {
      const startDate = dateRange[0]?.startDate;
      const endDate = dateRange[0]?.endDate;

      if (startDate && endDate) {
        const getDates = getDatesBetween(startDate, endDate);
        setDates(getDates);
      }
    }
  }, [dateRange]);

  return (
    <div className={cx("date-course-container")}>
      {dates.length > 0 &&
        dates.map((date: Date, index: number) => {
          return (
            <EachDate
              key={index}
              date={date}
              dateData={dateData}
              setDateData={setDateData}
              setIsDateConfirmed={setIsDateConfirmed}
              setIsSaved={setIsSaved}
            />
          );
        })}
      <div className={cx("memo-button-container")}>
        <textarea
          className={cx("memo-container")}
          placeholder="이 여행 경로에 대한 메모 작성하기"
        ></textarea>
        <div className={cx("button-container")}>
          <button className={cx("cancel-button")}>취소</button>
          <button className={cx("save-button")}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default DateCourse;
