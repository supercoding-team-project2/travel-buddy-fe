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

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePickerWithRange } from "@/components/Post/PostView/DatePickerWithRange";
import { PostCard } from "@/components/Post/PostView/PostCard";
import { DateRange } from "react-day-picker";
import api from "@/app/api/api";
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

const Loading = () => <div>Loading...</div>;

export const WriteButton = () => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/post-create");
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };

  return (
    <button className="writebutton" onClick={handleClick}>
      <Image
        src="./svg/write-icon.svg"
        alt="글쓰기 버튼"
        width={30}
        height={30}
      />
    </button>
  );
};

const ButtonOutline = ({ text, isActive, onClick }: any) => {
  const activeStyles = {
    backgroundColor: "rgb(195,216,230)",
    color: "rgb(255, 255, 255)",
  };

  const inactiveStyles = {
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(0, 0, 0)",
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="min-w-[80px] px-4 py-2 border rounded text-base"
      style={isActive ? activeStyles : inactiveStyles}
    >
      {text}
    </Button>
  );
};

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
          onOrderChange("asc");
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
  const search = searchParams.get("category");
  const validCategories = ["전체", "REVIEW", "COMPANION", "GUIDE"];
  const initialFilter = validCategories.includes(search || "")
    ? search
    : "전체";
  const [filter, setFilter] = useState<any>(initialFilter);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [sortOrder, setSortOrder] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<
    "ALL" | "recommended" | "participated"
  >("ALL");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      let fromDate: string | undefined;
      let toDate: string | undefined;

      if (selectedDateRange?.from) {
        const fromDateObj = new Date(selectedDateRange.from);
        fromDateObj.setDate(fromDateObj.getDate() + 1);
        fromDate = fromDateObj.toISOString().split("T")[0];
      }

      if (selectedDateRange?.to) {
        const toDateObj = new Date(selectedDateRange.to);
        toDateObj.setDate(toDateObj.getDate() + 1);
        toDate = toDateObj.toISOString().split("T")[0];
      }

      const response = await fetchData({
        category: filter === "전체" ? undefined : filter,
        startDate: fromDate,
        endDate: toDate,
        sortBy: sortOrder,
        order: order,
      });
      setFilteredPosts(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMyPosts = async (type: "recommended" | "participated") => {
    try {
      setLoading(true);
      let fromDate: string | undefined;
      let toDate: string | undefined;

      if (selectedDateRange?.from) {
        const fromDateObj = new Date(selectedDateRange.from);
        fromDateObj.setDate(fromDateObj.getDate() + 1);
        fromDate = fromDateObj.toISOString().split("T")[0];
        console.log("🚀 ~ getData ~ fromDate:", fromDate);
      }

      if (selectedDateRange?.to) {
        const toDateObj = new Date(selectedDateRange.to);
        toDateObj.setDate(toDateObj.getDate() + 1);
        toDate = toDateObj.toISOString().split("T")[0];
        console.log("🚀 ~ getData ~ toDate:", toDate);
      }

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
          category:
            filter === "전체" || filter === "REVIEW" ? undefined : filter,
          startDate: fromDate,
          endDate: toDate,
          sortBy: sortOrder,
          order: order,
        });
      }

      if (response.status === 404 && response.status === 500) {
        console.log("데이터가 없습니다.");
      } else if (response.data && response.data.length === 0) {
        setResponseMessage("데이터가 없습니다.");
      } else {
        setResponseMessage(null);
        setFilteredPosts(response.data);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.message);
        console.log("데이터없음");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewType === "ALL") {
      getData();
    } else if (viewType === "recommended" || viewType === "participated") {
      getMyPosts(viewType);
    }
  }, [viewType, filter, selectedDateRange, sortOrder, order]);

  const handleButtonClick = (type: "ALL" | "recommended" | "participated") => {
    setViewType(type);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePostClick = (postId: number) => {
    router.push(`/post-detail/${postId}`);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <Suspense fallback={<Loading />}>
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
                text="전체 게시물"
                isActive={viewType === "ALL"}
                onClick={() => handleButtonClick("ALL")}
              />
              <ButtonOutline
                text="추천한 게시물"
                isActive={viewType === "recommended"}
                onClick={() => handleButtonClick("recommended")}
              />
              <ButtonOutline
                text="참여한 여행"
                isActive={viewType === "participated"}
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
        {!responseMessage ? (
          <PostCard posts={filteredPosts} onPostClick={handlePostClick} />
        ) : (
          <div>{responseMessage}</div>
        )}
      </div>
    </Suspense>
  );
};
export default {
  ClientComponent,
};
