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

export const PostCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 p-10 md:px-20">
      {/* 첫번째 카드 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src="https://via.placeholder.com/600x360"
            alt="Placeholder"
          />
          {/* <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">
            New
          </div> */}
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
            후기
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-lg font-medium text-gray-800">
              남해관광재단 워케이션 프로젝트
            </div>
            <div className="flex">
              <Image
                src="./svg/thumbs-up.svg"
                width={30}
                height={30}
                alt="좋아요"
              />
              <div className="text-sm font-medium text-gray-800 mb-2">100</div>
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
              <Image
                src="./svg/thumbs-up.svg"
                width={30}
                height={30}
                alt="좋아요"
              />
              <div className="text-sm font-medium text-gray-800 mb-2">100</div>
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
          {/* <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">
            New
          </div> */}
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
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
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
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
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
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
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
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

export default { PostCard, SelectPost, ButtonOutline, WriteButton };
