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
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/PostView/DatePickerWithRange";
import { PostCard } from "@/components/PostView/PostCard";

const cx = classNames.bind(styles);

export const WriteButton = () => {
  const router = useRouter();
  return (
    <button className={cx("writebutton")}>
      <Image
        src="./svg/write-icon.svg"
        alt="글쓰기버튼"
        width={30}
        height={30}
        onClick={() => router.push("/post-edit")}
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

export const ClientComponent = () => {
  return (
    <div className={cx("post-container")}>
      <div className={cx("post-top-container")}>
        <div className={cx("button-container")}>
          <div className={cx("category-button-group")}>
            <ButtonOutline text="전체" />
            <ButtonOutline text="후기" />
            <ButtonOutline text="동행" />
            <ButtonOutline text="가이드" />
          </div>
          <div className={cx("view-button-group")}>
            <ButtonOutline text="추천한 게시물" />
            <ButtonOutline text="참여한 여행" />
          </div>
        </div>

        <div className={cx("select-write-group")}>
          <div className={cx("select-container")}>
            <SelectPost />
            <DatePickerWithRange />
          </div>

          <div className={cx("write-icon-container")}>
            <WriteButton />
          </div>
        </div>
      </div>
      <PostCard />
    </div>
  );
};

export default {
  ClientComponent,
};
