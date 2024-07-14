"use client";

import React from "react";
import Profile from "@/components/MyPage/Profile/Profile";
import MyCourse from "@/components/MyPage/MyCourse/MyCourse";
import MyPost from "@/components/MyPage/MyPost/MyPost";

import { useState } from "react";

const MyPageClient = () => {
  const [isMyCourseOpen, setIsMyCourseOpen] = useState<boolean>(true);
  const [isMyPostOpen, setIsMyPostOpen] = useState<boolean>(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState<boolean>(false);
  
  return (
    <>
      <Profile
        isMyCourseOpen={isMyCourseOpen}
        isMyPostOpen={isMyPostOpen}
        isMyInfoOpen={isMyInfoOpen}
        setIsMyCourseOpen={setIsMyCourseOpen}
        setIsMyPostOpen={setIsMyPostOpen}
        setIsMyInfoOpen={setIsMyInfoOpen}
      />
      {isMyCourseOpen && <MyCourse />}
      {isMyPostOpen && <MyPost />}
    </>
  );
};

export default MyPageClient;
