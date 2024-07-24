"use client";
import EditList from "@/components/PostEdit/editList";
import { Editor } from "@/components/PostEdit/editor";
import EditTitle from "@/components/PostEdit/editTitle";
import React from "react";
import dynamic from "next/dynamic";
import { trips } from "@/components/PostEdit/data"; //임시데이터
//임시데이터 지울때 인터페이스 가져와야함

// const Editor = dynamic(() => import("@/components/PostEdit/editor"), {
//   ssr: false,
// });

export interface ClientComponentProps {
  postId: number;
}

const clientComponent = ({ postId }: ClientComponentProps) => {
  return (
    <div className="px-20 py-10">
      <EditTitle />
      <EditList data={trips} />
      <Editor />
    </div>
  );
};

export default clientComponent;
