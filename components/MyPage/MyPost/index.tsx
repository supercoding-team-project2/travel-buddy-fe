import React, { useState, useEffect } from "react";
import axios from "axios";

import MyPostSort from "./MyPostSort";
import EachMyPost from "./EachMyPost";
import EmptyMyPost from "./EmptyMyPost";

import classNames from "classnames/bind";
import styles from "./MyPost.module.css";
import Image from "next/image";
import upArrow from "../../../assets/up-arrow.png";

const cx = classNames.bind(styles);

const MyPost: React.FC = () => {
  const [postData, setPostData] = useState([
    {
      id: 1,
      photo: "",
      title: "글 제목입니더",
      introduction:
        "'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.",
      createdAt: "2024/07/21",
    },
    {
      id: 2,
      photo: "",
      title: "제목이라고",
      introduction:
        "'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.",
      createdAt: "2024/07/22",
    },
    {
      id: 3,
      photo: "",
      title: "게시글 후기를 처음 써봐요",
      introduction:
        "'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.'워케이션 최적지'로서의 남해 이미지를 구축하고 체류형 관광지로서 자리매김하기 위해 여행에미치다 유저들을 대상으로 '남해 워케이션 프로그램'를 운영하였습니다. 참가자를 모집하고, 워케이션 프로그램을 운영하며, 이를 소셜 콘텐츠로 만들어 송출하였습니다.",
      createdAt: "2024/07/23",
    },
  ]);
  const [isReviewClicked, setIsReviewClicked] = useState(true);
  const [isAccompanyClicked, setIsAccompanyClicked] = useState(false);
  const [isGuideClicked, setIsGuideClicked] = useState(false);

  //게시글 axios get 요청
  const fetchPostData = (category: string) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/boards/my?category=${category}`,
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => {
          console.log("내 게시글 조회 데이터", response.data);
          setPostData(response.data);
        })
        .catch((error) => {
          console.error("내 게시글 조회 요청 실패", error);
        });
    }
  };

  //디폴트로 후기글 get
  useEffect(() => {
    fetchPostData("REVIEW");
  }, []);

  return (
    <>
      <div className={cx("myPost-container")}>
        <div
          className={cx("upArrow-container")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className={cx("upArrow-word")}>Top</div>
          <Image src={upArrow} alt="up-arrow" className={cx("upArrow-icon")} />
        </div>
        <MyPostSort
          isReviewClicked={isReviewClicked}
          setIsReviewClicked={setIsReviewClicked}
          isAccompanyClicked={isAccompanyClicked}
          isGuideClicked={isGuideClicked}
          setIsAccompanyClicked={setIsAccompanyClicked}
          setIsGuideClicked={setIsGuideClicked}
          fetchPostData={fetchPostData}
        />
        {postData.length === 0 ? (
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
