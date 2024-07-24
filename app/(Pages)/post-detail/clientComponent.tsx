"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/PostDetail/breadcrumb";
import useModal from "@/components/PostDetail/modal/modal";
import { useRouter } from "next/navigation";
import TravelBar from "@/components/PostDetail/TravelBar";
import { ProfilePost } from "@/components/PostDetail/profilePost";
import { IconButton } from "@/components/PostDetail/iconButton";
import formatDateString from "@/components/PostDetail/formatDateString";
import { translateCategory } from "@/components/PostView/translateCategory";
import {
  ClientComponentProps,
  Props,
} from "@/components/PostDetail/interfaces";

import api from "@/app/api/api";
import { useEffect, useState } from "react";

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
const DetailsTable = (data: any) => {
  const trip = data;

  return (
    <div>
      <table className="min-w-80 bg-white border border-gray-200">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">연령</td>
            <td className="py-2 px-4 border-b">
              {trip.data.ageMin}~{trip.data.ageMax} 대
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">참여인원</td>
            <td className="py-2 px-4 border-b">
              {trip.data.participantCount}/{trip.data.targetNumber}명
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">성별</td>
            <td className="py-2 px-4 border-b">{trip.data.gender}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TogetherBtn = ({ onClick }: any) => {
  return (
    <button
      className="px-4 py-2 text-white rounded"
      style={{ backgroundColor: "#c3d8e6", width: "30%" }}
      onClick={onClick}
    >
      참여신청
    </button>
  );
};

const isUserSame = (currentUserId: number, postUserId: number): boolean => {
  return currentUserId === postUserId;
};

/*   axios 요청하는 부분 */
const fetchData = async (postId: number): Promise<Props["data"][]> => {
  try {
    const response = await api.get(`/api/boards/${postId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

/*   clientComponent  */
const ClientComponent = ({ postId }: ClientComponentProps) => {
  const router = useRouter();
  const { openModal, closeModal, ModalWrapper } = useModal();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Props["data"][] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // let currentUserId = 123;
  // const postUserId = data[0].board.userId;
  // const result = isUserSame(currentUserId, postUserId);

  const handlePostClick = () => {
    router.push(`/post-edit/${postId}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await fetchData(postId);
        setData(responseData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (!modalOpen) {
      console.log("Modal closed. Refetching data...");
    }

    getData();
  }, [postId, modalOpen]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { board, route, trip }: any = data;

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
            {/* {result && (
              <>
                <IconButton
                  src="/svg/write-icon.svg"
                  alt="글쓰기버튼"
                  onClick={handlePostClick}
                />
                <IconButton src="/svg/trash.svg" alt="삭제버튼" />
              </>
            )} */}
            <IconButton
              src="/svg/write-icon.svg"
              alt="글쓰기버튼"
              onClick={handlePostClick}
            />
            <IconButton src="/svg/trash.svg" alt="삭제버튼" />
          </div>
        </div>

        <div className="flex justify-around">
          <InfoTable data={board} />
          <div className="flex flex-col pt-24  ">
            {/* {!result && (
              <>
                <DetailsTable data={data[0]} />
                <div className="flex items-center justify-center mt-4">
                  <TogetherBtn onClick={openModal} />
                  <TogetherBtn
                    onClick={() => {
                      openModal();
                      setModalOpen(true); 
                    }}
                  />
                </div>
              </>
            )} */}
            <DetailsTable data={trip} />
            <div className="flex items-center justify-center mt-4">
              <TogetherBtn onClick={openModal} />
            </div>
          </div>
        </div>

        <TravelBar route={route} />
        <ProfilePost data={board} />
      </div>
      <ModalWrapper
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
