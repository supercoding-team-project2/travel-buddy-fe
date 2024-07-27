"use client";
import EditList from "@/components/Post/PostCreate/editList";
import { Editor } from "@/components/Post/PostCreate/editor";
import EditTitle from "@/components/Post/PostCreate/editTitle";
import React, { useEffect, useState } from "react";
import api from "@/app/api/api";
import { useRouter } from "next/navigation";

//const [trips, setTrips] = useState<TripData[]>([]); //여행데이터 저장하는 trips

const clientComponent = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tripId, setTripId] = useState("");
  console.log("🚀 ~ clientComponent ~ tripId:", tripId);
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const router = useRouter();

  const handlePostView = () => {
    router.push("/post-view");
  };

  const getMyCourse = () => {
    const token = sessionStorage.getItem("token");

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

  useEffect(() => {
    getMyCourse();
  }, []);

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

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");

    const formDataToSend = new FormData();

    formDataToSend.append("routeId", String(tripId));
    formDataToSend.append("title", title);
    formDataToSend.append("summary", summary);
    formDataToSend.append("content", content);
    formDataToSend.append("category", category);
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
      handlePostView();
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <EditTitle onChange={handleChange} />
      <EditList data={courseData} onSelectChange={handleTripNameChange} />
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
