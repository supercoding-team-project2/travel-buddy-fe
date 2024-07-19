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

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/PostView/DatePickerWithRange";
import { PostCard } from "@/components/PostView/PostCard";
import { DateRange } from "react-day-picker";

const cx = classNames.bind(styles);

const posts = [
  {
    id: 2,
    categoryEnum: "GUIDE",
    title: "가이드와 함께하는 짧은 부산여행",
    summary: "mbti j인 가이드와 함께 떠나는 부산여행은 취향?",
    author: "Jane Smith",
    startAt: "2024-07-26",
    endAt: "2024-07-28",
    representativeImage: "/png/travel2.png",
    likeCount: 0,
  },
  {
    id: 1,
    categoryEnum: "COMPANION",
    title: "짧은 경주여행",
    summary: "낯선사람과 떠나는 경주 여행은 어떠세요?",
    author: "John Doe",
    startAt: "2024-07-24",
    endAt: "2024-07-26",
    representativeImage: "/png/travel2.png",
    likeCount: 10,
  },
  {
    id: 3,
    categoryEnum: "GUIDE",
    title: "부산여행",
    summary: "가위바위보라돌이뚜비나나",
    author: "랄랄",
    startAt: "2024-07-26",
    endAt: "2024-07-28",
    representativeImage: "/png/travel2.png",
    likeCount: 44,
  },
];

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
  onClick: any;
}

export function ButtonOutline({ text, onClick }: ButtonOutlineProps) {
  return (
    <Button onClick={onClick} variant="outline">
      {text}
    </Button>
  );
}

export const SelectPost = ({ onSortChange }: any) => {
  return (
    <Select onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="최신순">최신순</SelectItem>
        <SelectItem value="추천순">추천순</SelectItem>
      </SelectContent>
    </Select>
  );
};

interface Post {
  id: number;
  categoryEnum: string;
  title: string;
  summary: string;
  author: string;
  startAt: string;
  endAt: string;
  representativeImage: string;
  likeCount: number;
}

export const ClientComponent = () => {
  const [filter, setFilter] = useState("전체");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [sortOrder, setSortOrder] = useState("최신순");

  return (
    <div className={cx("post-container")}>
      <div className={cx("post-top-container")}>
        <div className={cx("button-container")}>
          <div className={cx("category-button-group")}>
            <ButtonOutline text="전체" onClick={() => setFilter("전체")} />
            <ButtonOutline text="후기" onClick={() => setFilter("후기")} />
            <ButtonOutline text="동행" onClick={() => setFilter("동행")} />
            <ButtonOutline text="가이드" onClick={() => setFilter("가이드")} />
          </div>
          <div className={cx("view-button-group")}>
            <ButtonOutline
              text="추천한 게시물"
              onClick={() => setFilter("전체")}
            />
            <ButtonOutline
              text="참여한 여행"
              onClick={() => setFilter("전체")}
            />
          </div>
        </div>

        <div className={cx("select-write-group")}>
          <div className={cx("select-container")}>
            <SelectPost onSortChange={setSortOrder} />
            <DatePickerWithRange onDateChange={setSelectedDateRange} />
          </div>

          <div className={cx("write-icon-container")}>
            <WriteButton />
          </div>
        </div>
      </div>
      <PostCard posts={filteredPosts} />
    </div>
  );
};

export default {
  ClientComponent,
};
