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
import { useRouter, useSearchParams } from "next/navigation";
import { DatePickerWithRange } from "@/components/Post/PostView/DatePickerWithRange";
import { PostCard } from "@/components/Post/PostView/PostCard";
import { DateRange } from "react-day-picker";
import api from "@/app/api/api";
import { posts } from "@/components/Post/PostView/posts";
import {
  ButtonOutlineProps,
  Post,
} from "@/components/Post/PostView/interfaces";
import {
  fetchData,
  fetchParticipatedPosts,
  fetchRecommendedPosts,
} from "@/components/Post/PostView/fetchApi";

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
        onClick={() => router.push("/post-create")}
      />
    </button>
  );
};

const ButtonOutline = ({ text, isActive, onClick }: any) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`min-w-[80px] px-4 py-2 border rounded text-base ${
        isActive ? "bg-blue-500 text-white" : "bg-white text-black"
      }`}
    >
      {text}
    </Button>
  );
};

// export function ButtonOutline({ text, onClick }: ButtonOutlineProps) {
//   return (
//     <Button onClick={onClick} variant="outline">
//       {text}
//     </Button>
//   );
// }

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [filter, setFilter] = useState(category || "전체");

  useEffect(() => {
    if (category) {
      setFilter(category);
    }
  }, [category]);

  console.log("🚀 ~ ClientComponent ~ filter:", filter);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  console.log("🚀 ~ ClientComponent ~ selectedDateRange:", selectedDateRange);
  const [sortOrder, setSortOrder] = useState("createdAt");
  console.log("🚀 ~ ClientComponent ~ sortOrder:", sortOrder);
  const [order, setOrder] = useState("desc");

  const [data, setData] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<
    "recommended" | "participated" | null
  >("recommended"); // 상태 추가

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

  const getMy = async (type: "recommended" | "participated") => {
    try {
      setLoading(true);
      const fromDate = selectedDateRange?.from
        ? selectedDateRange.from.toISOString()
        : undefined;
      const toDate = selectedDateRange?.to
        ? selectedDateRange.to.toISOString()
        : undefined;

      let response;
      if (type === "recommended") {
        response = await fetchRecommendedPosts({
          category: filter === "전체" ? undefined : filter,
          startDate: fromDate,
          endDate: toDate,
          sortBy: sortOrder,
          order: order,
        });
      } else if (type === "participated") {
        response = await fetchParticipatedPosts({
          category: filter === "전체" ? undefined : filter,
          startDate: fromDate,
          endDate: toDate,
          sortBy: sortOrder,
          order: order,
        });
      }

      setData(response.data);
      setFilteredPosts(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (viewType === null) return;
  //   getMy(viewType);
  // }, [viewType, filter, selectedDateRange, sortOrder, order]);

  const handleButtonClick = (type: "recommended" | "participated") => {
    setViewType(type);
  };

  // 버튼 클릭 시
  // const handleButtonClick = (type: "recommended" | "participated") => {
  //   setViewType(type); //이거 없어도 될듯
  //   getMy(type);
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePostClick = (postId: number) => {
    router.push(`/post-detail/${postId}`);
  };

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  return (
    <div className={cx("post-container")}>
      <div className={cx("post-top-container")}>
        <div className={cx("button-container")}>
          <div className={cx("category-button-group")}>
            <ButtonOutline
              text="전체"
              isActive={filter === "전체"}
              onClick={() => handleFilterChange("전체")}
            />
            <ButtonOutline
              text="후기"
              isActive={filter === "REVIEW"}
              onClick={() => handleFilterChange("REVIEW")}
            />
            <ButtonOutline
              text="동행"
              isActive={filter === "COMPANION"}
              onClick={() => handleFilterChange("COMPANION")}
            />
            <ButtonOutline
              text="가이드"
              isActive={filter === "GUIDE"}
              onClick={() => handleFilterChange("GUIDE")}
            />
          </div>

          <div className={cx("view-button-group")}>
            <ButtonOutline
              text="추천한 게시물"
              onClick={() => handleButtonClick("recommended")}
            />
            <ButtonOutline
              text="참여한 여행"
              onClick={() => handleButtonClick("participated")}
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
