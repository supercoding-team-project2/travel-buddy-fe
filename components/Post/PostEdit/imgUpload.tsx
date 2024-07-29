import React, { useState } from "react";
import Image from "next/image";

interface ImgUploadProps {
  onImagesChange?: (images: string[]) => void;
}

const ImgUpload = ({ onImagesChange }: ImgUploadProps) => {
  const [previewSrcList, setPreviewSrcList] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-indigo-600");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
    const files = e.dataTransfer.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      displayPreview(file);
    });
  };

  const displayPreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setPreviewSrcList((prev) => {
          const newSrcList = [...prev, reader.result as string];
          if (onImagesChange) {
            onImagesChange(newSrcList); // 부모에게 이미지 리스트 전달
          }
          return newSrcList;
        });
      }
    };
  };

  const handleRemoveImage = (index: number) => {
    setPreviewSrcList((prev) => {
      const newSrcList = prev.filter((_, i) => i !== index);
      if (onImagesChange) {
        onImagesChange(newSrcList); // 부모에게 이미지 리스트 전달
      }
      return newSrcList;
    });
  };

  return (
    <>
      {previewSrcList.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="w-[300px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
          id="dropzone"
        >
          <input
            onChange={handleChange}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50"
            id="file-upload"
            multiple
          />
          <div className="text-center">
            <Image
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
              alt="Upload icon"
              width={48}
              height={48}
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>Drag and drop</span>
                <span className="text-indigo-600"> or browse</span>
                <span> to upload</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                />
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
      {previewSrcList.length > 0 && (
        <div className="flex mt-4 mx-auto w-full overflow-x-auto border">
          <div className="flex flex-nowrap">
            {previewSrcList.map((src, index) => (
              <div key={index} className="relative mr-2 mb-2 flex-shrink-0">
                <div className="w-[400px] h-[400px] relative">
                  <Image
                    src={src}
                    alt={`Preview ${index}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="relative mr-2 mb-2 flex-shrink-0">
              <div className="w-[400px] h-[400px] relative bg-gray-100 flex items-center justify-center">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className="w-[300px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                  id="dropzone"
                >
                  <input
                    onChange={handleChange}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                    id="file-upload"
                    multiple
                  />
                  <Image
                    className="mx-auto h-12 w-12"
                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                    alt="Upload icon"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImgUpload;
