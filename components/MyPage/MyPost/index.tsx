import React, { useState, useEffect } from "react";
import axios from "axios";

import MyPostSort from "./MyPostSort";
import EachMyPost from "./EachMyPost";
import EmptyMyPost from "./EmptyMyPost";
import Loading from "@/components/Loading";

import classNames from "classnames/bind";
import styles from "./MyPost.module.css";
import Image from "next/image";
import upArrow from "@/assets/up-arrow.png";

const cx = classNames.bind(styles);

interface Props {
  token: string | null;
}

const MyPost = ({ token }: Props) => {
  const [postData, setPostData] = useState([]);
  const [isReviewClicked, setIsReviewClicked] = useState(true);
  const [isAccompanyClicked, setIsAccompanyClicked] = useState(false);
  const [isGuideClicked, setIsGuideClicked] = useState(false);
  const [isUparrowVisible, setIsUparrowVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //게시글 axios get 요청
  const fetchPostData = (category: string) => {
    if (token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/boards/my?category=${category}`,
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => {
          console.log(`내 게시글 ${category} 조회 데이터`, response.data.data);
          setPostData(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(`내 게시글 ${category} 조회 요청 실패`, error);
        });
    } else {
      throw new Error("토큰이 없습니다.");
    }
  };

  //디폴트로 후기글 get
  useEffect(() => {
    fetchPostData("REVIEW");

    //Top arrow
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsUparrowVisible(true);
      } else {
        setIsUparrowVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className={cx("myPost-container")}>
        {isUparrowVisible && (
          <div
            className={cx("upArrow-container")}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src={upArrow}
              alt="up-arrow"
              className={cx("upArrow-icon")}
            />
          </div>
        )}
        <MyPostSort
          isReviewClicked={isReviewClicked}
          setIsReviewClicked={setIsReviewClicked}
          isAccompanyClicked={isAccompanyClicked}
          isGuideClicked={isGuideClicked}
          setIsAccompanyClicked={setIsAccompanyClicked}
          setIsGuideClicked={setIsGuideClicked}
          fetchPostData={fetchPostData}
        />
        {!isLoading && postData.length === 0 ? (
          <EmptyMyPost />
        ) : (
          <div className={cx("myPost-list-container")}>
            {postData.map((element: any, index: number) => {
              return (
                <EachMyPost
                  key={element.id}
                  id={element.id}
                  photo={element.representativeImage}
                  title={element.title}
                  introduction={element.summary}
                  category={element.category}
                  createdAt={element.createdAt}
                  fetchPostData={fetchPostData}
                  token={token}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPost;
