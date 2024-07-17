"use client";
import EditList from "@/components/PostEdit/editList";
import { Editor } from "@/components/PostEdit/editor";
import EditTitle from "@/components/PostEdit/editTitle";
import React from "react";
import dynamic from "next/dynamic";

// const Editor = dynamic(() => import("@/components/PostEdit/editor"), {
//   ssr: false,
// });

const clientComponent = () => {
  return (
    <div className="px-20 py-10">
      <EditTitle />
      <EditList />
      <Editor />
    </div>
  );
};

export default clientComponent;
