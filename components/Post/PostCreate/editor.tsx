import React, { useEffect, useState } from "react";
import ImgUpload from "./imgUpload";
import Checkbox from "./checkbox";

interface EditTextProps {
  initialData?: {
    images: string[];
    content: string;
    checkbox: CheckboxData;
  };
  onSelectChange: any;
  onEditChange: any;
}

interface CheckboxData {
  ageMin: number | undefined;
  ageMax: number | undefined;
  participants: number;
  gender: string;
}

// onSelectChange: 내려받는 거(부모->자식) onEditChange: 올려주는 거(부모 <- 자식)
export const Editor = ({
  initialData,
  onSelectChange,
  onEditChange,
}: EditTextProps) => {
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

  useEffect(() => {
    if (onEditChange) {
      onEditChange({ images, content, checkboxData });
    }
  }, [images, content, checkboxData]);

  return (
    <div className="relative flex flex-col bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
      <div className="flex flex-col p-4">
        <ImgUpload onImagesChange={handleImagesChange} />
        <div className="my-6">
          <textarea
            placeholder="글 내용"
            id="content"
            name="content"
            className="w-[80rem] h-[20rem] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <div>
          {onSelectChange !== "REVIEW" && (
            <Checkbox onChange={handleCheckboxChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
