import React, { useEffect, useState } from "react";
import ImgUpload from "./imgUpload";
import Checkbox from "./checkbox";

interface EditTextProps {
  initialData?: {
    images: string[];
    content: string;
    checkbox: CheckboxData;
  };
}

interface CheckboxData {
  ageMin: number | undefined;
  ageMax: number | undefined;
  participants: number;
  gender: string;
}

export const Editor = ({ initialData }: EditTextProps) => {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [content, setContent] = useState(initialData?.content || "");
  const [checkboxData, setCheckboxData] = useState<CheckboxData>({
    ageMin: initialData?.checkbox.ageMin,
    ageMax: initialData?.checkbox.ageMax,
    participants: initialData?.checkbox.participants || 1,
    gender: initialData?.checkbox.gender || "",
  });

  const handleCheckboxChange = (data: CheckboxData) => {
    setCheckboxData(data);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImagesChange = (imageList: string[]) => {
    setImages(imageList);
  };

  // // 체크박스 데이터 변경 시
  // useEffect(() => {
  //   console.log("🚀 ~ useEffect ~ checkboxData:", checkboxData);
  // }, [checkboxData]);

  // // 이미지 데이터 변경 시
  // useEffect(() => {
  //   console.log("🚀 ~ useEffect ~ images:", images);
  // }, [images]);

  return (
    <div className="relative flex flex-col bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
      <div className="flex flex-col p-4">
        <ImgUpload onImagesChange={handleImagesChange} />
        <div className="my-6">
          <textarea
            placeholder="글 내용"
            id="content"
            name="content"
            className="w-[80rem] h-[20rem] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <div>
          <Checkbox onChange={handleCheckboxChange} />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Editor;
