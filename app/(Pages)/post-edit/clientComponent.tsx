"use client";
import EditList from "@/components/PostEdit/editList";
import { Editor } from "@/components/PostEdit/editor";
import EditTitle from "@/components/PostEdit/editTitle";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { trips } from "@/components/PostEdit/data"; //임시데이터
import api from "@/app/api/api";
import { Props } from "@/components/PostDetail/interfaces";

export interface ClientComponentProps {
  postId: number;
}

const clientComponent = ({ postId }: ClientComponentProps) => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

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

  const fetchData = async (postId: number): Promise<Props["data"]> => {
    try {
      const response = await api.get(`/api/boards/${postId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  };

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await fetchData(postId);
      setData(responseData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* get 요청 */
  useEffect(() => {
    if (postId) {
      getData();
    }
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { board, trip }: any = data;
  console.log("🚀 ~ clientComponent ~ trip:", trip);
  console.log("🚀 ~ clientComponent ~ board:", board);

  if (!data) return <div>No data available</div>;

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log("🚀 ~ handleSubmit ~ token:", token);
    const formDataToSend = new FormData();

    formDataToSend.append("routeId", "8");
    formDataToSend.append("title", String(title));
    formDataToSend.append("summary", String(summary));
    formDataToSend.append("content", String(content));
    formDataToSend.append("category", String(category));
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
    formDataToSend.append("gender", String(gender));

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
      const response = await api.put(`/api/boards/${postId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log("🚀 ~ handleSubmit ~ formDataToSend:", formDataToSend);
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <EditTitle onChange={handleChange} initialData={board} />
      <EditList data={trips} onSelectChange={handleTripNameChange} />
      <Editor
        onSelectChange={category}
        onEditChange={handleEditChange}
        initialData={{
          images: board.images || [], // 예시: board에서 images 추출
          content: board.content || "", // 예시: board에서 content 추출
          checkbox: {
            ageMin: trip.ageMin, // 예시: trip에서 ageMin 추출
            ageMax: trip.ageMax, // 예시: trip에서 ageMax 추출
            participants: trip.participants, // 예시: trip에서 participants 추출
            gender: trip.gender, // 예시: trip에서 gender 추출
          },
        }}
      />
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
