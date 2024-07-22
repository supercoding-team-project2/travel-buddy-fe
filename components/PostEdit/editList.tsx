import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TravelBar from "../PostDetail/TravelBar";
import { Props } from "../PostDetail/interfaces";
import formatDateString from "../PostDetail/formatDateString";

const EditList = ({ data }: Props) => {
  const startDate = formatDateString(data.route.startAt);
  const endDate = formatDateString(data.route.endAt);
  return (
    <div className="my-10">
      <div className="flex mb-2 gap-10">
        <div>
          <Select>
            <SelectTrigger className="w-[180px] border-gray-500">
              <SelectValue placeholder="내 경로 리스트" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="동행">여행제목A</SelectItem>
              <SelectItem value="후기">여행제목B</SelectItem>
              <SelectItem value="가이드">여행제목C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {startDate}~{endDate}
        </div>
      </div>
      <div className="border">
        <TravelBar route={data.route} />
      </div>
    </div>
  );
};

export default EditList;
