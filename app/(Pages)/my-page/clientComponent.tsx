"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/MyPage/Profile";
import MyCourse from "@/components/MyPage/MyCourse";
import MyPost from "@/components/MyPage/MyPost";
import MyInfo from "@/components/MyPage/MyInfo";

import { StaticImageData } from "next/image";

// 이렇게하면 왜 에러가 뜰까?
// import { Profile, MyCourse, MyPost, MyInfo } from "@/components/MyPage";

const MyPageClient = () => {
  const [isMyCourseOpen, setIsMyCourseOpen] = useState<boolean>(true);
  const [isMyPostOpen, setIsMyPostOpen] = useState<boolean>(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string | StaticImageData>("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      setToken(localToken);

      if (!localToken) {
        router.push("/login");
      }
    }
  }, []);

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
        token={token}
      />
      {isMyCourseOpen && <MyCourse token={token} />}
      {isMyPostOpen && <MyPost token={token} />}
      {isMyInfoOpen && (
        <MyInfo
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          token={token}
        />
      )}
    </>
  );
};

export default MyPageClient;
