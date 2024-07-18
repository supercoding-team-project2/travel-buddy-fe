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
    image: "/png/travel2.png",
    label: "후기",
    title: "서울 워케이션 체험기",
    author: "이순신",
    date: {
      from: "2024.03.10",
      to: "2024.03.20",
    },
    content:
      "서울에서의 워케이션 경험을 공유합니다. 다양한 카페와 편리한 교통 덕분에 업무 효율이 높았습니다.",
    likes: 150,
  },
  {
    image: "/png/travel3.png",
    label: "동행",
    title: "제주도 함께 여행해요",
    author: "김유신",
    date: {
      from: "2024.06.01",
      to: "2024.06.10",
    },
    content:
      "제주도로 함께 여행 갈 동행을 구합니다. 함께 즐거운 추억을 만들어요!",
    likes: 120,
  },
  {
    image: "/png/travel4.png",
    label: "가이드",
    title: "부산 가이드 투어",
    author: "신사임당",
    date: {
      from: "2024.07.05",
      to: "2024.07.15",
    },
    content:
      "부산의 숨은 명소를 소개합니다. 현지인만 아는 맛집과 명소를 함께 탐방해요.",
    likes: 200,
  },
  {
    image: "/png/travel5.png",
    label: "후기",
    title: "강릉 워케이션 후기",
    author: "장보고",
    date: {
      from: "2024.02.15",
      to: "2024.02.25",
    },
    content:
      "강릉에서의 워케이션은 정말 멋졌습니다. 바다를 보며 일할 수 있는 최고의 장소였습니다.",
    likes: 180,
  },
  {
    image: "/png/travel6.png",
    label: "동행",
    title: "경주 문화 탐방",
    author: "정약용",
    date: {
      from: "2024.05.20",
      to: "2024.05.30",
    },
    content:
      "경주의 역사와 문화를 함께 탐방할 동행을 구합니다. 많은 배움을 함께 나눠요.",
    likes: 130,
  },
  {
    image: "/png/travel7.png",
    label: "가이드",
    title: "대구 숨은 맛집 투어",
    author: "허균",
    date: {
      from: "2024.04.05",
      to: "2024.04.10",
    },
    content:
      "대구의 숨은 맛집을 소개합니다. 현지인만 아는 진짜 맛집을 함께 탐방해요.",
    likes: 210,
  },
  {
    image: "/png/travel8.png",
    label: "후기",
    title: "전주 한옥마을 워케이션 후기",
    author: "김정희",
    date: {
      from: "2024.01.10",
      to: "2024.01.20",
    },
    content:
      "전주 한옥마을에서의 워케이션 경험을 공유합니다. 전통과 현대가 어우러진 멋진 장소였습니다.",
    likes: 140,
  },
  {
    image: "/png/travel9.png",
    label: "동행",
    title: "속초 바다 여행",
    author: "최영",
    date: {
      from: "2024.03.20",
      to: "2024.03.30",
    },
    content:
      "속초 바다로 함께 여행 갈 동행을 구합니다. 바다를 보며 힐링할 수 있는 시간을 가져요.",
    likes: 110,
  },
  {
    image: "/png/travel2.png",
    label: "가이드",
    title: "광주 예술 투어",
    author: "박지원",
    date: {
      from: "2024.06.10",
      to: "2024.06.20",
    },
    content:
      "광주의 예술과 문화를 소개합니다. 다양한 예술 작품과 전시회를 함께 감상해요.",
    likes: 160,
  },
  {
    image: "/png/travel1.png",
    label: "후기",
    title: "울산 워케이션 체험기",
    author: "이황",
    date: {
      from: "2024.05.01",
      to: "2024.05.10",
    },
    content:
      "울산에서의 워케이션 체험기를 공유합니다. 공업 도시의 매력을 새롭게 발견했습니다.",
    likes: 190,
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
  image: string;
  label: string;
  title: string;
  author: string;
  date: {
    from: string;
    to: string;
  };
  content: string;
  likes: number;
}

export const ClientComponent = () => {
  const [filter, setFilter] = useState("전체");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [sortOrder, setSortOrder] = useState("최신순");

  useEffect(() => {
    console.log("Current filter:", filter);
    let filtered = posts;

    if (filter !== "전체") {
      filtered = filtered.filter((post) => {
        console.log(`Post label: ${post.label}, Filter: ${filter}`);
        return post.label === filter;
      });
    }

    if (selectedDateRange) {
      filtered = filtered.filter((post) => {
        const postDateFrom = new Date(post.date.from);
        const postDateTo = new Date(post.date.to);
        const selectedFrom = selectedDateRange.from || new Date();
        const selectedTo = selectedDateRange.to || new Date();

        return (
          (postDateFrom >= selectedFrom && postDateFrom <= selectedTo) ||
          (postDateTo >= selectedFrom && postDateTo <= selectedTo) ||
          (postDateFrom <= selectedFrom && postDateTo >= selectedTo)
        );
      });
    }

    const sortPosts = (posts: Post[]) => {
      if (sortOrder === "최신순") {
        return [...posts].sort(
          (a, b) =>
            new Date(b.date.from).getTime() - new Date(a.date.from).getTime()
        );
      } else if (sortOrder === "추천순") {
        return [...posts].sort((a, b) => b.likes - a.likes);
      }
      return posts;
    };

    const sortedAndFilteredPosts = sortPosts(filtered);

    setFilteredPosts(sortedAndFilteredPosts);
  }, [filter, selectedDateRange, sortOrder]);

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
