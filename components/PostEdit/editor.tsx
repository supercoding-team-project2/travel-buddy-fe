import React, { useState } from "react";
import ImgUpload from "./imgUpload";
import Checkbox from "./checkbox";
//import dynamic from "next/dynamic";

// const ImgUpload = dynamic(() => import("./imgUpload"), {
//   ssr: false,
// });

interface EditTextProps {
  initialData?: {
    images: string[];
    content: string;
    checkbox: Boxs;
  };
}

interface Boxs {
  ageMin: number;
  ageMax: number;
  participantCount: number;
  gender: string;
}

export const Editor = ({ initialData }: EditTextProps) => {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [content, setContent] = useState(initialData?.content || "");
  const [checkboxData, setCheckboxData] = useState<Boxs>(
    initialData?.checkbox || {
      ageMin: 0,
      ageMax: 0,
      participantCount: 0,
      gender: "",
    }
  );

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div className="relative flex flex-col bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
      <div className="flex flex-col p-4  ">
        <ImgUpload />
        <div className="my-6 ">
          <textarea
            placeholder="글 내용"
            id="content"
            name="content"
            className="w-[80rem] h-[20rem] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <div>
          <Checkbox />
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
