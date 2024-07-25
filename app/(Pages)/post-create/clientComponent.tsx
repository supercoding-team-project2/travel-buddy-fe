"use client";
import EditList from "@/components/PostCreate/editList";
import { Editor } from "@/components/PostCreate/editor";
import EditTitle from "@/components/PostCreate/editTitle";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TripData } from "@/components/PostCreate/interfaces";
import { trips } from "@/components/PostEdit/data"; //임시데이터
import api from "@/app/api/api";

// const Editor = dynamic(() => import("@/components/PostEdit/editor"), {
//   ssr: false,
// });

//확인된 데이터: select, title, summary, travelBar-name,images[], content, 동행/가이드일경우의 체크박스
//여기서 travel 전체를 가져와야 하면 editList에서 selectedTrip이걸로 onSelectChange 셋해주기
//후기일 경우 -> 데이터 안보내주는 걸로 바꿔야함. 아니면 걍 어차피

const clientComponent = () => {
  const [trips, setTrips] = useState<TripData[]>([]); //여행데이터 저장하는 trips
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    summary: "",
  });

  const [tripName, setTripName] = useState("");

  const [editData, setEditData] = useState({
    images: [],
    content: "",
    checkbox: {},
  });
  console.log("🚀 ~ clientComponent ~ editData:", editData);

  /* 제목 */
  const handleChange = (newData: {
    category: string;
    title: string;
    summary: string;
  }) => {
    setFormData(newData);
  };

  /* 경로바에서 이름 */
  const handleTripNameChange = (nameData: string) => {
    setTripName(nameData);
  };

  /* 본문 */
  const handleEditChange = (newData: {
    images: [];
    content: string;
    checkbox: {};
  }) => {
    setEditData(newData);
  };

  useEffect(() => {
    // 여행 데이터를 가져오는 함수
    const fetchTrips = async () => {
      try {
        const response = await api.get("/api/trips");
        setTrips(response.data);
      } catch (error: any) {
        console.error(
          "Error fetching trips:",
          error.response?.data || error.message
        );
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="px-20 py-10">
      <EditTitle onChange={handleChange} />
      {/* <EditTitle initialData={initialData} /> */}
      {/*이거 위에 뭐냐면 수정일 경우에, 원래 있던 데이터 넣어야하잔슴. 그거 말하는 거임*/}
      <EditList data={trips} onSelectChange={handleTripNameChange} />
      <Editor
        onSelectChange={formData.category}
        onEditChange={handleEditChange}
      />
    </div>
  );
};

export default clientComponent;
