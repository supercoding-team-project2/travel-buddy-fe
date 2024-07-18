import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditTitle = () => {
  return (
    <>
      <div className="flex gap-3">
        <div>
          <Select>
            <SelectTrigger className="w-[180px] border-gray-500">
              <SelectValue placeholder="동행" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="동행">동행</SelectItem>
              <SelectItem value="후기">후기</SelectItem>
              <SelectItem value="가이드">가이드</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex mb-6 w-[40rem]">
          <input
            placeholder="제목"
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
      </div>
      <div>
        <input
          placeholder="간단한 소개글"
          type="text"
          id="title"
          name="title"
          className="w-full h-[5rem] px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
    </>
  );
};

export default EditTitle;
