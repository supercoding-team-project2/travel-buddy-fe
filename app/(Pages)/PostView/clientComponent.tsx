"use client";

import styles from "./PostView.module.css";
import classNames from "classnames/bind";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const cx = classNames.bind(styles);

export const WriteButton = () => {
  return (
    <button className={cx("writebutton")}>
      <Image
        src="./svg/write-icon.svg"
        alt="글쓰기버튼"
        width={30}
        height={30}
      />
    </button>
  );
};

interface ButtonOutlineProps {
  text: string;
}

export function ButtonOutline({ text }: ButtonOutlineProps) {
  return <Button variant="outline">{text}</Button>;
}

export const SelectPost = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="최신순">최신순</SelectItem>
        <SelectItem value="추천순">추천순</SelectItem>
        <SelectItem value="추천순">조회순</SelectItem>
      </SelectContent>
    </Select>
  );
};

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* 좋아요 클릭 버튼에 대한 */
const ButtonWithHoverImage = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Image
        src={
          isClicked || isHovered
            ? "./svg/thumbs-up-fill.svg"
            : "./svg/thumbs-up.svg"
        }
        width={30}
        height={30}
        alt="좋아요"
      />
    </button>
  );
};

/* 카드 하나로 묶어서 만들기 */
export const PostCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 p-10 md:px-20">
      {/* 첫번째 카드 */}
      <button className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          {/* <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">
            New
          </div> */}
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
            후기
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-lg font-medium text-gray-800">
              남해관광재단 워케이션 프로젝트
            </div>
            <div className="flex">
              {ButtonWithHoverImage()}
              <div className="text-lg font-medium text-gray-800">100</div>
            </div>
          </div>
          <div className="flex">
            <div className="text-sm font-medium text-gray-800 mb-2">홍길동</div>
            <div className="text-sm font-medium text-gray-800 mb-2">
              /여행 기간: 2024.07.13
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam
            quam massa id lacus.
          </p>
        </div>
      </button>

      {/* 두번째 카드 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
            동행
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-lg font-medium text-gray-800">
              {`일본정부관광국 <Zoom in Japan>`}
            </div>
            <div className="flex">
              {ButtonWithHoverImage()}
              <div className="text-lg font-medium text-gray-800">100</div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-800 mb-2">홍길동</div>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam
            quam massa id lacus.
          </p>
        </div>
      </div>

      {/* 세번째 카드 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
            가이드
          </div>
        </div>
        <div className="p-4">
          <div className="text-lg font-medium text-gray-800">{`강원관광재단 <취미여행>`}</div>
          <div className="text-sm font-medium text-gray-800 mb-2">홍길동</div>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam
            quam massa id lacus.
          </p>
        </div>
      </div>

      {/* 네번째 카드 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
            가이드
          </div>
        </div>
        <div className="p-4">
          <div className="text-lg font-medium text-gray-800">{`하나투어 <밍글링투어>`}</div>
          <div className="text-sm font-medium text-gray-800 mb-2">홍길동</div>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam
            quam massa id lacus.
          </p>
        </div>
      </div>

      {/* 다섯번째 카드 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
            후기
          </div>
        </div>
        <div className="p-4">
          <div className="text-lg font-medium text-gray-800">
            밥상의여정 프로젝트
          </div>
          <div className="text-sm font-medium text-gray-800 mb-2">홍길동</div>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam
            quam massa id lacus.
          </p>
        </div>
      </div>

      {/* 여섯번째 카드 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
            동행
          </div>
        </div>
        <div className="p-4">
          <div className="text-lg font-medium text-gray-800">{`캐나다관광청 <캐나다에 미치다>`}</div>
          <div className="text-sm font-medium text-gray-800 mb-2">홍길동</div>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam
            quam massa id lacus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default {
  PostCard,
  SelectPost,
  ButtonOutline,
  WriteButton,
  DatePickerWithRange,
};
