import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DateRange, DateRangePickerProps } from "react-date-range";

import classnames from "classnames/bind";
import styles from "./CalendarModal.module.css";
import "./DateRange.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const cx = classnames.bind(styles);

interface Props {
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: DateRangePickerProps["ranges"];
  setDateRange: React.Dispatch<
    React.SetStateAction<DateRangePickerProps["ranges"]>
  >;
}

const CalendarModal = ({
  isCalendarOpen,
  setIsCalendarOpen,
  dateRange,
  setDateRange,
}: Props) => {
  const modalRoot: HTMLElement = document.getElementById("overlays-modal")!;

  //set calendar modal state to true when rendered
  useEffect(() => {
    setIsCalendarOpen(false);
  }, []);

  //modal selection handler
  const selectionClickHandler = () => {
    if (dateRange) {
      if (
        dateRange.length > 0 &&
        dateRange[0].startDate !== dateRange[0].endDate
      ) {
        setIsCalendarOpen(false);
      } else {
        alert("여행 기간을 설정해주세요.");
      }
    }
  };

  if (!isCalendarOpen) return null;

  return createPortal(
    <div className={cx("calendar-overlays")}>
      <div className={cx("calendar-modal-container")}>
        <div className={cx("calendar-title")}>여행 기간이 어떻게 되시나요?</div>
        <div className={cx("calendar-subtitle")}>
          여행지 출발/도착 날짜로 여행기간을 입력해 주세요.
        </div>
        <div className={cx("calendar-container")}>
          <DateRange
            ranges={dateRange}
            onChange={(ranges) => setDateRange([ranges.selection])}
          />
        </div>
        <button
          className={cx("selection-button")}
          onClick={selectionClickHandler}
        >
          선택
        </button>
      </div>
    </div>,
    modalRoot
  )!;
};

export default CalendarModal;
