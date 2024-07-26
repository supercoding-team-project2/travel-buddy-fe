"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./MainPage.module.css";
import { MainSlider } from "../components/Main/MainSlider/MainSlider";
import { CourseCard } from "../components/Main/CourseCard/CourseCard";
import Link from "next/link";

const cx = classNames.bind(styles);

interface Post {
  id: number;
  title: string;
  representativeImage: string;
}

interface ApiResponse {
  top6ReviewBoards: Post[];
  top6GuideBoards: Post[];
  top6CompanionBoards: Post[];
}

export default function MainPage() {
  const sample1 = "/png/hamster.png";
  const sample2 = "/png/hamster2.png";
  const sample3 = "/png/hemsworth.png";
  const [topReviewData, settopReviewData] = useState<Post[]>([]);
  const [topGuideData, setTopGuideData] = useState<Post[]>([]);
  const [topCompanionData, setTopCompanionData] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/boards/top6-categories`)
      .then((response) => {
        console.log("메인 페이지 top 게시글 패치 성공", response.data);
        const data: ApiResponse = response.data;
        settopReviewData(data.top6ReviewBoards);
        setTopGuideData(data.top6GuideBoards);
        setTopCompanionData(data.top6CompanionBoards);
      })
      .catch((error) => console.error("메인 페이지 게시글 패치 실패", error));
  }, []);

  return (
    <div className={cx("MainPage")}>
      <MainSlider />
      <section>
        {/* <div className={cx("topWrapper")}> */}
        {/* <img src="/svg/airplane.svg" alt="" /> */}
        <div className={cx("wrapper")}>
          <div className={cx("title")}>인기있는 여행 후기</div>
          <Link href={"/"} className={cx("link")}>
            전체보기
          </Link>
        </div>
        {/* </div> */}
        <div className={cx("container")}>
          {topReviewData.map((review) => (
            <CourseCard
              key={review.id}
              id={review.id}
              title={review.title}
              // url={review.representativeImage}
              url={sample1}
            />
          ))}
        </div>
      </section>
      <section>
        {/* <div className={cx("topWrapperReverse")}> */}
        <div className={cx("wrapper")}>
          <div className={cx("title")}>가이드와 함께하는 패키지 여행</div>
          <Link href={"/"} className={cx("link")}>
            전체보기
          </Link>
          {/* <img src="/svg/airplane.svg" alt="" /> */}
          {/* </div> */}
        </div>
        <div className={cx("container")}>
          {topGuideData.map((guide) => (
            <CourseCard
              key={guide.id}
              id={guide.id}
              title={guide.title}
              // url={guide.representativeImage}
              url={sample2}
            />
          ))}
        </div>
      </section>
      <section>
        {/* <div className={cx("topWrapper")}> */}
        {/* <img src="/svg/airplane.svg" alt="" /> */}
        <div className={cx("wrapper")}>
          <div className={cx("title")}>함께하는 동행 여행</div>
          <Link href={"/"} className={cx("link")}>
            전체보기
          </Link>
        </div>
        {/* </div> */}
        <div className={cx("container")}>
          {topCompanionData.map((companion) => (
            <CourseCard
              key={companion.id}
              id={companion.id}
              title={companion.title}
              // url={companion.representativeImage}
              url={sample3}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
