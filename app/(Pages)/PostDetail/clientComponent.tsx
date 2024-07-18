"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/PostDetail/breadcrumb";
import useModal from "@/components/PostDetail/modal/modal";
import { useRouter } from "next/navigation";
import TravelBar from "@/components/PostDetail/TravelBar";
import ProfilePost from "@/components/PostDetail/profilePost";
import { IconButton } from "@/components/PostDetail/iconButton";

/*경로바-TravelBar */
const locations = [
  {
    date: "2024년 7월 18일",
    location: [
      {
        name: "용용선생",
        description: "restaurant",
      },
      {
        name: "스타벅스",
        description: "cafe",
      },
      { name: "대박장소", description: "locality" },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      { name: "신라호텔", description: "hotel" },
    ],
  },
  {
    date: "2024년 7월 18일",
    location: [
      {
        name: "용용선생",
        description: "restaurant",
      },
      {
        name: "스타벅스",
        description: "cafe",
      },
      { name: "대박장소", description: "locality" },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      {
        name: "레전드맛집",
        description: "restaurant",
      },
      { name: "신라호텔", description: "hotel" },
    ],
  },
];

/*참가인원-DetailsTable */
const participations = [
  {
    age: [{ min: 20, max: 30 }],
    number: 20,
    gender: "무관",
  },
];

const InfoTable = ({}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-24 pb-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            남해관광재단 워케이션 프로젝트
          </h1>
          <p className="mb-8 leading-relaxed">
            여미랑 같이 남해로 워케이션 가실 분? (ꔷ̥̑.̮ꔷ̥̑) 어차피 일해야 한다면
            #남해로출근 👥👤👥👤(무료래 웅성웅성) 추석 연휴 뒤에 휴가 못 붙인
            여미 담당자😭 사무실 나가기 싫은 핑계로 워케이션을 가려고 합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

const DetailsTable = ({ participations }: any) => {
  return (
    <div>
      {participations.map((participation: any, index: number) => (
        <table key={index} className="min-w-80 bg-white border border-gray-200">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">연령</td>

              {participation.age.map((age: any, index: number) => (
                <td key={index} className="py-2 px-4 border-b">
                  {age.min}~{age.max} 대
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">참여인원</td>
              <td className="py-2 px-4 border-b">{participation.number}명</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">성별</td>
              <td className="py-2 px-4 border-b">{participation.gender}</td>
            </tr>
          </tbody>
        </table>
      ))}
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

/*   clientComponent    */
const ClientComponent = () => {
  const router = useRouter();
  const { openModal, ModalWrapper } = useModal();
  return (
    <>
      <div className="flex flex-col space-y-4 m-6">
        <BreadcrumbWithCustomSeparator />
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-grow">
            <div className="mr-4">2024년 7월 25일 ~ 2024년 7월 28일</div>
            <div
              style={{ backgroundColor: "#c3d8e6" }}
              className="border px-2 text-white rounded"
            >
              동행
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
          <InfoTable />
          <div className="flex flex-col pt-24  ">
            <DetailsTable participations={participations} />
            <div className="flex items-center justify-center mt-4">
              {/* 현재 참여인원받아서 뿌려주는걸로 */}
              <TogetherBtn onClick={openModal} />
            </div>
          </div>
        </div>

        {/* 여행경로바 */}
        <TravelBar locations={locations} />
        <ProfilePost />
      </div>
      <ModalWrapper content="3" />
    </>
  );
};

export default ClientComponent;
