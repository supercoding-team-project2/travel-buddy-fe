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

const cx = classNames.bind(styles);

const posts = [
  {
    image: "/png/travel1.png",
    label: "동행",
    title: "남해관광재단 워케이션 프로젝트",
    author: "홍길동",
    date: {
      from: "2024.07.13",
      to: "2024.07.15",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.",
    likes: 100,
  },
  {
    image: "/png/travel1.png",
    label: "동행",
    title: "남해관광재단 워케이션 프로젝트",
    author: "홍길동",
    date: {
      from: "2024.07.13",
      to: "2024.07.15",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.",
    likes: 100,
  },
  {
    image: "/png/travel1.png",
    label: "동행",
    title: "남해관광재단 워케이션 프로젝트",
    author: "홍길동",
    date: {
      from: "2024.07.13",
      to: "2024.07.15",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.",
    likes: 100,
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
  const [filter, setFilter] = useState("전체");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    console.log("Current filter:", filter);
    if (filter === "전체") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        console.log(`Post label: ${post.label}, Filter: ${filter}`);
        return post.label === filter;
      });
      console.log("filtered-posts:", filtered);
      setFilteredPosts(filtered);
    }
  }, [filter]);

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
            <SelectPost />
            <DatePickerWithRange />
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
