"use client";
import EditList from "@/components/Post/PostEdit/editList";
import { Editor } from "@/components/Post/PostEdit/editor";
import EditTitle from "@/components/Post/PostEdit/editTitle";
import React, { useEffect, useState } from "react";
import api from "@/app/api/api";
import { Props } from "@/components/Post/PostDetail/interfaces";
import { useRouter } from "next/navigation";

export interface ClientComponentProps {
  postId: number;
}

const ClientComponent = ({ postId }: ClientComponentProps) => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [participants, setParticipants] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [tripId, setTripId] = useState("");
  console.log("🚀 ~ clientComponent ~ tripId:", tripId);

  const handlePostView = () => {
    router.push(`/post-detail/${postId}`);
  };

  const getMyCourse = () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/api/routes/list`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log("경로 조회 데이터", response.data);
          setCourseData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("경로 조회 요청 실패", error);
        });
    }
  };

  function removeBase64Prefix(base64String: any) {
    const base64Prefix = "base64,";
    const base64Index = base64String.indexOf(base64Prefix);
    if (base64Index !== -1) {
      return base64String.slice(base64Index + base64Prefix.length);
    }
    return base64String;
  }

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
    setTripId(nameData);
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
      getMyCourse();
    }
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { board, trip }: any = data;

  if (!data) return <div>No data available</div>;

  const handleSubmit = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();

    formDataToSend.append("routeId", String(tripId));
    formDataToSend.append("title", String(title));
    formDataToSend.append("summary", String(summary));
    formDataToSend.append("content", String(content));
    formDataToSend.append("category", String(category));
    images.forEach((image, index) => {
      if (typeof image === "string") {
        const base64Data = removeBase64Prefix(image);
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        const file = new File([blob], `image${index}.jpg`, {
          type: "image/jpeg",
        });

        formDataToSend.append("images", file);
      } else if (image instanceof File) {
        formDataToSend.append("images", image);
      }
    });

    if (category === "REVIEW") {
      formDataToSend.append("ageMin", "");
      formDataToSend.append("ageMax", "");
      formDataToSend.append("targetNumber", "");
      formDataToSend.append("gender", "");
    } else {
      formDataToSend.append("ageMin", String(ageMin));
      formDataToSend.append("ageMax", String(ageMax));
      formDataToSend.append("targetNumber", String(participants));
      formDataToSend.append("gender", gender);
    }

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
      console.log("Form submitted successfully", response.data);
      handlePostView();
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <EditTitle onChange={handleChange} initialData={board} />
      <EditList data={courseData} onSelectChange={handleTripNameChange} />
      <Editor
        onSelectChange={category}
        onEditChange={handleEditChange}
        initialData={{
          images: board.images || [],
          content: board.content || "",
          checkbox: {
            ageMin: trip.ageMin,
            ageMax: trip.ageMax,
            participants: trip.targetNumber,
            gender: trip.gender,
          },
        }}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
          style={{ backgroundColor: "#c3d8e6" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ClientComponent;
