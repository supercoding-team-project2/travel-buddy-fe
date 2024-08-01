import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditTitleProps {
  initialData?: {
    category: string;
    title: string;
    summary: string;
  };
  onChange: (data: {
    category: string;
    title: string;
    summary: string;
  }) => void;
}

const EditTitle = ({ initialData, onChange }: EditTitleProps) => {
  const [category, setCategory] = useState(initialData?.category || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");

  useEffect(() => {
    if (onChange) {
      onChange({ category, title, summary });
    }
  }, [category, title, summary]);

  return (
    <>
      <div className="flex gap-3">
        <div>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-[180px] border-gray-500">
              <SelectValue placeholder="동행" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPANION">동행</SelectItem>
              <SelectItem value="REVIEW">후기</SelectItem>
              <SelectItem value="GUIDE">가이드</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex mb-6 w-[40rem]">
          <input
            placeholder="제목"
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          className="w-full h-[5rem] px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>
    </>
  );
};

export default EditTitle;
