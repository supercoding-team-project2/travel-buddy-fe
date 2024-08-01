"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/Post/PostDetail/breadcrumb";
import useModal from "@/components/Post/PostDetail/modal/modal";
import { useRouter } from "next/navigation";
import TravelBar from "@/components/Post/PostDetail/TravelBar";
import { ProfilePost } from "@/components/Post/PostDetail/profilePost";
import { IconButton } from "@/components/Post/PostDetail/iconButton";
import formatDateString from "@/components/Post/PostDetail/formatDateString";
import { translateCategory } from "@/components/Post/PostView/translateCategory";
import {
  ClientComponentProps,
  Props,
} from "@/components/Post/PostDetail/interfaces";

import api from "@/app/api/api";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import bin from "@/assets/bin.png";

const InfoTable = (data: any) => {
  const board = data;
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-24 pb-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900">
            {board.data.title}
          </h1>
          <p className="mb-8 text-xl leading-relaxed">{board.data.summary}</p>
        </div>
      </div>
    </section>
  );
};

const translationGender: any = {
  ALL: "무관",
  FEMALE: "여성",
  MALE: "남성",
};

const translateGender = (gender: any) => {
  return translationGender[gender] || gender;
};

const DetailsTable = ({ data, result }: { data: any; result: boolean }) => {
  console.log("🚀 ~ DetailsTable ~ UserResult:", result);
  const trip = data;
  return (
    <div>
      <table className="min-w-80 bg-white border border-gray-200">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">연령</td>
            <td className="py-2 px-4 border-b">
              {trip.ageMin}~{trip.ageMax} 대
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">참여인원</td>
            {!result ? (
              <td className="py-2 px-4 border-b">
                {trip.participantCount}/{trip.targetNumber}명
              </td>
            ) : (
              <td className="py-2 px-4 border-b">
                <span style={{ color: "#000000" }}>
                  {trip.participantCount}/{trip.targetNumber}명
                </span>{" "}
                <span style={{ color: "#FF0000", marginLeft: "5px" }}>
                  {" "}
                  {trip.participantCount >= trip.targetNumber && "(인원 마감)"}
                </span>
              </td>
            )}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">성별</td>
            <td className="py-2 px-4 border-b">
              {translateGender(trip.gender)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TogetherBtn = ({ onClick, label }: any) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    if (token) {
      onClick();
    } else {
      toast({
        variant: "destructive",
        title: "로그인 후 이용해 주세요.",
        description: "Please log-in and use it",
        action: (
          <ToastAction
            altText="로그인"
            onClick={() => router.push("/login")}
            style={{ backgroundColor: "#87a7c7", color: "white" }}
          >
            로그인
          </ToastAction>
        ),
        style: {
          backgroundColor: "rgb(195, 216, 230)",
          color: "#000",
          border: "1px solid #87a7c7",
        },
      });
    }
  };

  return (
    <button
      className="px-4 py-2 text-white rounded"
      style={{ backgroundColor: "#c3d8e6", width: "30%" }}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

const isUserSame = (currentUserId: number, postUserId: number): boolean => {
  return currentUserId === postUserId;
};

/* 전체 조회 - GET */
const fetchData = async (postId: number): Promise<any> => {
  if (typeof window === "undefined") {
    throw new Error("localStorage is not available on the server.");
  }
  try {
    const response = await api.get(`/api/boards/${postId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const currentUserId = () => {
  if (typeof window === "undefined") {
    throw new Error("localStorage is not available on the server.");
  }
  const userToken = localStorage.getItem("token");
  if (userToken) {
    const decoded: any = jwtDecode(userToken);
    return decoded.userId;
  } else {
    console.log("No token found in session storage.");
  }
};

/*   clientComponent  */
const ClientComponent = ({ postId }: ClientComponentProps) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal, ModalWrapper } = useModal();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Props["data"][] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTravel, setIsTravel] = useState<boolean>(false);
  console.log("🚀 ~ ClientComponent ~ isTravel:", isTravel);
  const [travelId, setTravelId] = useState<number | null>(null);

  const handlePostClick = () => {
    router.push(`/post-edit/${postId}`);
  };

  const handleDelete = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await api.delete(`/api/boards/${postId}`, {
          headers: { Authorization: token },
        });
        console.log("Post deleted successfully");
        router.push("/post-view");
      } else {
        console.error("No token found.");
      }
    } catch (error: any) {
      console.error("Failed to delete the post:", error);
      setError(error.response?.data?.message || "Failed to delete the post");
    }
  };

  /* 전체 조회 - GET */
  const getData = async () => {
    try {
      const responseData = await fetchData(postId);
      setData(responseData);
      setTravelId(responseData.trip.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 여행 정보 가져오기
  const getTravel = async () => {
    if (typeof window === "undefined" || !travelId) {
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    try {
      const response = await api.get(`/api/attend/${travelId}`, {
        headers: { Authorization: token },
      });
      setIsTravel(response.data.result);
      console.log("Travel data:", response.data.result);
    } catch (error: any) {
      console.error("Error fetching travel data:", error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, [postId]);

  useEffect(() => {
    if (!isOpen) {
      console.log("🚀 ~ ClientComponent ~ modalOpen:", modalOpen);
      getData();
    }
  }, [postId, isOpen]);

  useEffect(() => {
    if (travelId) {
      getTravel();
    }
  }, [travelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { board, route, trip, likeStatus }: any = data;
  const boardCategory = board.category;

  const tripId = trip.id; //여행 아이디
  const authorId = board.authorID; //작성자 아이디
  let userCurrentId = currentUserId(); //현재 유저 아이디
  const UserResult = isUserSame(userCurrentId, authorId);
  console.log("🚀 ~ ClientComponent ~ 작성자일경우 true:", UserResult);

  let tripParticipantCount = trip.participantCount;
  let tripTargetNumber = trip.targetNumber;
  const result = isUserSame(tripTargetNumber, tripParticipantCount);

  if (!data) return <div>No data available</div>;

  /*여행 취소 - delete 요청 */
  const onCancel = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/api/attend/${tripId}`, {
        headers: { Authorization: token },
      });
      console.log("참여취소 성공");
      getData();
    } catch (error: any) {
      console.error("참여 취소 중 오류 발생:", error);
    }
  };

  if (!board || !route || !trip) {
    return <div>Some data is missing</div>;
  }

  const startDate = formatDateString(route.startAt ?? "");
  const endDate = formatDateString(route.endAt ?? "");
  return (
    <>
      <div className="flex flex-col space-y-4 m-6">
        <BreadcrumbWithCustomSeparator />
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-grow">
            <div className="mr-4">
              {startDate}~{endDate}
            </div>
            <div
              style={{ backgroundColor: "#c3d8e6" }}
              className="border px-2 text-white rounded"
            >
              {translateCategory(board.category)}
            </div>
          </div>
          <div className="flex">
            {UserResult && (
              <>
                <IconButton
                  src="/svg/write-icon.svg"
                  alt="글쓰기버튼"
                  onClick={handlePostClick}
                />
                <IconButton
                  src={bin}
                  alt="삭제버튼"
                  onClick={handleDelete}
                  width={25}
                  height={25}
                />
              </>
            )}
          </div>
        </div>

        <div
          className={`flex ${
            boardCategory === "REVIEW" ? "justify-around" : "justify-around"
          }`}
        >
          <InfoTable data={board} />
          {boardCategory !== "REVIEW" && (
            <div className="flex flex-col pt-24">
              <DetailsTable data={trip} result={result} />
              <div className="flex items-center justify-center mt-4">
                {!result && !UserResult && !isTravel && (
                  <TogetherBtn
                    onClick={() => {
                      openModal();
                      setModalOpen(true);
                    }}
                    label="참여신청"
                  />
                )}
                {!UserResult && isTravel && (
                  <TogetherBtn onClick={onCancel} label="참여취소" />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border items-center">
          <TravelBar route={route} />
        </div>

        <ProfilePost data={board} getData={getData} />
      </div>
      <ModalWrapper
        tripId={tripId}
        content={trip.participantCount}
        onClose={() => {
          closeModal();
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default ClientComponent;
