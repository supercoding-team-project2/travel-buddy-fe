"use client";
import EditList from "@/components/Post/PostCreate/editList";
import { Editor } from "@/components/Post/PostCreate/editor";
import EditTitle from "@/components/Post/PostCreate/editTitle";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TripData } from "@/components/Post/PostCreate/interfaces";
import { trips } from "@/components/Post/PostEdit/data"; //임시데이터
import api from "@/app/api/api";
import { useRouter } from "next/router";

// const Editor = dynamic(() => import("@/components/PostEdit/editor"), {
//   ssr: false,
// });

//확인된 데이터: select, title, summary, travelBar-name,images[], content, 동행/가이드일경우의 체크박스
//여기서 travel 전체를 가져와야 하면 editList에서 selectedTrip이걸로 onSelectChange 셋해주기
//후기일 경우 -> 데이터 안보내주는 걸로 바꿔야함. 아니면 걍 어차피

//const [trips, setTrips] = useState<TripData[]>([]); //여행데이터 저장하는 trips

// useEffect(() => {
//   // 여행 데이터를 가져오는 함수
//   const fetchTrips = async () => {
//     try {
//       const response = await api.get("/api/trips");
//       setTrips(response.data);
//     } catch (error: any) {
//       console.error(
//         "Error fetching trips:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   fetchTrips();
// }, []);

const clientComponent = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tripName, setTripName] = useState("");

  function removeBase64Prefix(base64String: any) {
    const base64Prefix = "base64,";
    const base64Index = base64String.indexOf(base64Prefix);

    if (base64Index !== -1) {
      return base64String.slice(base64Index + base64Prefix.length);
    }
    return base64String;
  }

  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [participants, setParticipants] = useState("");
  const [gender, setGender] = useState("");

  /* 제목 변경 핸들러 */
  const handleChange = (newData: {
    category: string;
    title: string;
    summary: string;
  }) => {
    setCategory(newData.category);
    setTitle(newData.title);
    setSummary(newData.summary);
  };

  /* 경로바에서 이름 변경 핸들러 */
  const handleTripNameChange = (nameData: string) => {
    setTripName(nameData);
  };

  /* 본문 변경 핸들러 */
  const handleEditChange = (newData: {
    images: File[];
    content: string;
    checkboxData: {
      ageMin: string;
      ageMax: string;
      participants: string;
      gender: string;
    };
  }) => {
    setImages(newData.images);
    setContent(newData.content);
    setAgeMin(newData.checkboxData.ageMin);
    setAgeMax(newData.checkboxData.ageMax);
    setParticipants(newData.checkboxData.participants);
    setGender(newData.checkboxData.gender);
  };

  // routeId : 3
  // title : 게시글 등록 테스트
  // summary : 게시글 등록 간단 설명
  // content : 본문 내용
  // category : REVIEW , COMPANION , GUIDE
  // images : 이미지 파일들
  // ageMin : 20
  // ageMax : 30
  // targetNumber : 2
  // gender : MALE , FEMALE , ALL

  const handleSubmit = async () => {
    //const router = useRouter();
    const token = sessionStorage.getItem("token");

    const formDataToSend = new FormData();

    // FormData에 값 추가
    formDataToSend.append("routeId", "8");
    formDataToSend.append("title", title);
    formDataToSend.append("summary", summary);
    formDataToSend.append("content", content);
    formDataToSend.append("category", category);
    images.forEach((image, index) => {
      if (typeof image === "string") {
        // base64 문자열에서 실제 데이터만 추출
        const base64Data = removeBase64Prefix(image);

        // base64를 Blob으로 변환
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        // Blob을 File 객체로 변환
        const file = new File([blob], `image${index}.jpg`, {
          type: "image/jpeg",
        });

        formDataToSend.append("images", file);
      } else if (image instanceof File) {
        formDataToSend.append("images", image);
      }
    });

    formDataToSend.append("ageMin", String(ageMin));
    formDataToSend.append("ageMax", String(ageMax));
    formDataToSend.append("targetNumber", String(participants));
    formDataToSend.append("gender", gender);

    formDataToSend.forEach((value, key) => {
      let valueType;
      if (value instanceof File) {
        valueType = "File";
      } else if (typeof value === "string") {
        valueType = "String";
      } else if (typeof value === "number") {
        valueType = "Number";
      } else {
        valueType = "Unknown";
      }

      console.log(`${key}:`, value, `(Type: ${valueType})`);
    });

    try {
      const response = await api.post("/api/boards", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      console.log("Form submitted successfully", response.data);
      //router.push("/post-view");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <EditTitle onChange={handleChange} />

      <EditList data={trips} onSelectChange={handleTripNameChange} />
      <Editor onSelectChange={category} onEditChange={handleEditChange} />
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default clientComponent;
