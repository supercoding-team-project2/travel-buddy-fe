import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditList = () => {
  return (
    <div className="my-10">
      <div className="flex mb-2 gap-10">
        <div>
          <Select>
            <SelectTrigger className="w-[180px] border-gray-500">
              <SelectValue placeholder="내 경로 리스트" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="동행">동행</SelectItem>
              <SelectItem value="후기">후기</SelectItem>
              <SelectItem value="가이드">가이드</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>2024년 8월 15일 ~ 2024년 8월 18일</div>
      </div>
      <div className="border">경로바 넣을 자리</div>
    </div>
  );
};

export default EditList;
