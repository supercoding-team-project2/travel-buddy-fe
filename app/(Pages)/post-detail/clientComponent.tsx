"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/PostDetail/breadcrumb";
import useModal from "@/components/PostDetail/modal/modal";
import { useRouter } from "next/navigation";
import TravelBar from "@/components/PostDetail/TravelBar";
import ProfilePost from "@/components/PostDetail/profilePost";
import { IconButton } from "@/components/PostDetail/iconButton";
import formatDateString from "@/components/PostDetail/formatDateString";
import { translateCategory } from "@/components/PostView/translateCategory";
import { Props } from "@/components/PostDetail/interfaces";

const data = [
  {
    board: {
      id: 1,
      title: "짧은 경주여행",
      summary: "낯선사람과 떠나는 경주 여행은 어떠세요?",
      content: "1일차부터 3일차까지 정말 여유로운 코스로 계획했습니다.",
      category: "COMPANION",
      author: "John Doe",
      likeCount: 1,
      images: [
        "/png/travel1.png",
        "/png/travel2.png",
        "/png/travel3.png",
        "/png/travel4.png",
        "/png/travel5.png",
        "/png/travel6.png",
        "/png/travel7.png",
      ],
    },
    route: {
      startAt: "2024-07-24",
      endAt: "2024-07-26",
      routeDetails: {
        "2024-07-26": [
          {
            placeName: "경주 국밥 맛집",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "서울역",
            placeCategory: "ATTRACTION",
          },
        ],
        "2024-07-25": [
          {
            placeName: "경주 돈까스 맛집",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "루프탑 카페",
            placeCategory: "CAFE",
          },
          {
            placeName: "경주 황리단길 한옥펜션",
            placeCategory: "HOTEL",
          },
          {
            placeName: "경주 돈까스 맛집",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "루프탑 카페",
            placeCategory: "CAFE",
          },
          {
            placeName: "경주 황리단길 한옥펜션",
            placeCategory: "HOTEL",
          },
        ],
        "2024-07-24": [
          {
            placeName: "파스타",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "신상카페",
            placeCategory: "CAFE",
          },
          {
            placeName: "경주 5성급 호텔",
            placeCategory: "HOTEL",
          },
        ],
      },
    },
    trip: {
      ageMin: 20,
      ageMax: 30,
      targetNumber: 4,
      participantCount: 0,
      gender: "ALL",
    },
  },
];

const InfoTable = ({ data }: Props) => {
  const { board } = data;
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-24 pb-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900">
            {board.title}
          </h1>
          <p className="mb-8 text-xl leading-relaxed">{board.summary}</p>
        </div>
      </div>
    </section>
  );
};

const DetailsTable = ({ data }: Props) => {
  const { trip } = data;
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
            <td className="py-2 px-4 border-b">
              {trip.participantCount}/{trip.targetNumber}명
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">성별</td>
            <td className="py-2 px-4 border-b">{trip.gender}</td>
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

interface ClientComponentProps {
  postId: number;
}

/*   clientComponent    */
const ClientComponent = ({ postId }: ClientComponentProps) => {
  console.log("🚀 ~ ClientComponent ~ postId:", postId);
  const router = useRouter();
  const { openModal, ModalWrapper } = useModal();
  const startDate = formatDateString(data[0].route.startAt);
  const endDate = formatDateString(data[0].route.endAt);
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
              {translateCategory(data[0].board.category)}
            </div>
          </div>
          <div className="flex">
            <IconButton
              src="/svg/write-icon.svg"
              alt="글쓰기버튼"
              onClick={() => router.push("/post-edit")}
            />
            <IconButton src="/svg/trash.svg" alt="삭제버튼" />
          </div>
        </div>

        <div className="flex justify-around">
          <InfoTable data={data[0]} />
          <div className="flex flex-col pt-24  ">
            <DetailsTable data={data[0]} />
            <div className="flex items-center justify-center mt-4">
              <TogetherBtn onClick={openModal} />
            </div>
          </div>
        </div>

        <TravelBar route={data[0].route} />
        <ProfilePost data={data[0]} />
      </div>
      <ModalWrapper content={data[0].trip.participantCount} />
    </>
  );
};

export default ClientComponent;
