import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DateRangePicker, DateRangePickerProps } from "react-date-range";

import classnames from "classnames/bind";
import styles from "./CalendarModal.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const cx = classnames.bind(styles);

interface Props {
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarModal = ({ isCalendarOpen, setIsCalendarOpen }: Props) => {
  const modalRoot: HTMLElement = document.getElementById("overlays-modal")!;

  useEffect(() => {
    setIsCalendarOpen(true);
  }, []);

  const [dateRange, setDateRange] = useState<DateRangePickerProps["ranges"]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  if (!isCalendarOpen) return null;

  return createPortal(
    <div className={cx("calendar-overlays")}>
      <div className={cx("calendar-modal-container")}>
        <div className={cx("calendar-title")}>여행 기간이 어떻게 되시나요?</div>
        <div className={cx("calendar-subtitle")}>
          여행지 출발/도착 날짜로 여행기간을 입력해 주세요.
        </div>
        <div className={cx("calendar-container")}>
          <DateRangePicker
            ranges={dateRange}
            onChange={(ranges) => setDateRange([ranges.selection])}
          />
        </div>
      </div>
    </div>,
    modalRoot
  )!;
};

export default CalendarModal;
