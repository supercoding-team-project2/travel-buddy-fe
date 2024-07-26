"use client";

import React from "react";
import Profile from "@/components/MyPage/Profile";
import MyCourse from "@/components/MyPage/MyCourse";
import MyPost from "@/components/MyPage/MyPost";
import MyInfo from "@/components/MyPage/MyInfo";

import { StaticImageData } from "next/image";

// 이렇게하면 왜 에러가 뜰까?
// import { Profile, MyCourse, MyPost, MyInfo } from "@/components/MyPage";

import { useState } from "react";

const MyPageClient = () => {
  const [isMyCourseOpen, setIsMyCourseOpen] = useState<boolean>(true);
  const [isMyPostOpen, setIsMyPostOpen] = useState<boolean>(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string | StaticImageData>("");

  return (
    <>
      <Profile
        isMyCourseOpen={isMyCourseOpen}
        isMyPostOpen={isMyPostOpen}
        isMyInfoOpen={isMyInfoOpen}
        profilePic={profilePic}
        setIsMyCourseOpen={setIsMyCourseOpen}
        setIsMyPostOpen={setIsMyPostOpen}
        setIsMyInfoOpen={setIsMyInfoOpen}
        setProfilePic={setProfilePic}
      />
      {isMyCourseOpen && <MyCourse />}
      {isMyPostOpen && <MyPost />}
      {isMyInfoOpen && (
        <MyInfo profilePic={profilePic} setProfilePic={setProfilePic} />
      )}
    </>
  );
};

export default MyPageClient;
