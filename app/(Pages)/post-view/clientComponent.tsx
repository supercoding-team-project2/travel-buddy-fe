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
import api from "@/app/api/api";
import { posts } from "@/components/PostView/posts";
import { Router } from "next/router";

const cx = classNames.bind(styles);

export const fetchData = async ({
  category,
  startDate,
  endDate,
  sortBy,
  order,
}: any) => {
  try {
    const params = {
      category,
      startDate,
      endDate,
      sortBy,
      order,
    };

    const response = await api.get("/endpoint", { params });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

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
        <SelectItem value="createdAt">최신순</SelectItem>
        <SelectItem value="likes">추천순</SelectItem>
        <SelectItem value="title">가나다순</SelectItem>
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
  //const [sortOrder, setSortOrder] = useState("createdAt");

  const [data, setData] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetchData({
  //         category: filter === "전체" ? undefined : filter,
  //         startDate: selectedDateRange?.from?.toISOString(),
  //         endDate: selectedDateRange?.to?.toISOString(),
  //         sortBy: sortOrder,
  //         order: "asc", // or "desc" based on your requirement
  //       });
  //       setData(response);
  //       setFilteredPosts(response);
  //     } catch (err:any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getData();
  // }, [filter, selectedDateRange, sortOrder]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const router = useRouter();
  const handlePostClick = (id: number) => {
    router.push(`/post-detail/${id}`);
  };

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
      <PostCard posts={filteredPosts} onPostClick={handlePostClick} />
    </div>
  );
};

export default {
  ClientComponent,
};
