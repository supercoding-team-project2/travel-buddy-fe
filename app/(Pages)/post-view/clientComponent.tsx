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
import { ButtonOutlineProps, Post } from "@/components/PostView/interfaces";

const cx = classNames.bind(styles);

export const fetchData = async ({
  category,
  startDate,
  endDate,
  sortBy,
  order,
}: {
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  order?: string;
}) => {
  try {
    const params: Record<string, string> = {};

    if (category && category !== "전체") {
      params.category = encodeURIComponent(category.trim());
    }
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    const response = await api.get("/api/boards", { params });

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
        onClick={() => router.push("/post-create")}
      />
    </button>
  );
};

export function ButtonOutline({ text, onClick }: ButtonOutlineProps) {
  return (
    <Button onClick={onClick} variant="outline">
      {text}
    </Button>
  );
}

export const SelectPost = ({
  sortOrder,
  onSortChange,
  onOrderChange,
}: {
  sortOrder: string;
  onSortChange: (value: string) => void;
  onOrderChange: (value: string) => void;
}) => {
  return (
    <Select
      value={sortOrder}
      onValueChange={(value) => {
        onSortChange(value);
        if (value === "title") {
          onOrderChange("asc"); // 가나다순일 때는 오름차순
        } else {
          onOrderChange("desc");
        }
      }}
    >
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

export const ClientComponent = () => {
  const [filter, setFilter] = useState("전체");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  console.log("🚀 ~ ClientComponent ~ selectedDateRange:", selectedDateRange);
  //const [sortOrder, setSortOrder] = useState("최신순");
  const [sortOrder, setSortOrder] = useState("createdAt");
  console.log("🚀 ~ ClientComponent ~ sortOrder:", sortOrder);
  const [order, setOrder] = useState("desc");

  const [data, setData] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // 기본값: 전체 기간
        const fromDate = selectedDateRange?.from
          ? selectedDateRange.from.toISOString()
          : undefined;
        const toDate = selectedDateRange?.to
          ? selectedDateRange.to.toISOString()
          : undefined;

        const response = await fetchData({
          category: filter === "전체" ? undefined : filter,
          startDate: fromDate,
          endDate: toDate,
          sortBy: sortOrder,
          order: order,
        });
        setData(response);
        setFilteredPosts(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [filter, selectedDateRange, sortOrder]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const router = useRouter();
  const handlePostClick = (postId: number) => {
    router.push(`/post-detail/${postId}`);
  };

  return (
    <div className={cx("post-container")}>
      <div className={cx("post-top-container")}>
        <div className={cx("button-container")}>
          <div className={cx("category-button-group")}>
            <ButtonOutline text="전체" onClick={() => setFilter("전체")} />
            <ButtonOutline text="후기" onClick={() => setFilter("REVIEW")} />
            <ButtonOutline
              text="동행"
              onClick={() => setFilter(" COMPANION")}
            />
            <ButtonOutline text="가이드" onClick={() => setFilter("GUIDE")} />
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
            <SelectPost
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              onOrderChange={setOrder}
            />
            <DatePickerWithRange
              onDateChange={setSelectedDateRange}
              dateRange={selectedDateRange}
            />
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
