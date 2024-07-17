"use client";
import styles from "./PostDetail.module.css";
import classNames from "classnames/bind";
import { BreadcrumbWithCustomSeparator } from "@/components/PostDetail/breadcrumb";
import Image from "next/image";
const cx = classNames.bind(styles);
import ImgSlider from "@/components/PostDetail/ImgSlider";
import { useState } from "react";
import useModal from "@/components/PostDetail/modal/modal";
import { useRouter, usePathname } from "next/navigation";
import TravelBar from "@/components/PostDetail/TravelBar";

//any말고 inteface로 타입 정해서 하기...
const IconButton = ({
  src,
  alt,
  className,
  width = 30,
  height = 30,
  onClick,
}: any) => {
  return (
    <button className={cx("writebutton", className)} onClick={onClick}>
      <Image src={src} alt={alt} width={width} height={height} />
    </button>
  );
};

/*따봉 버튼 */
const ButtonWithHoverImage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Image
        src={
          isClicked || isHovered
            ? "./svg/thumbs-up-fill.svg"
            : "./svg/thumbs-up.svg"
        }
        width={30}
        height={30}
        alt="좋아요"
      />
    </button>
  );
};

const InfoTable = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
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

const DetailsTable = () => {
  return (
    <div>
      <table className="min-w-80 bg-white border border-gray-200">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">연령</td>
            <td className="py-2 px-4 border-b">20~30</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">참여인원</td>
            <td className="py-2 px-4 border-b">4명</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">성별</td>
            <td className="py-2 px-4 border-b">무관</td>
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

interface MycommentSectionProps {
  onSubmit: (comment: Comment) => void;
}

interface Comment {
  id: number;
  userName: string;
  userImage: string;
  text: string;
}

const MycommentSection: React.FC<MycommentSectionProps> = ({ onSubmit }) => {
  const [commentBody, setCommentBody] = useState("");

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: Comment = {
      id: new Date().getTime(),
      userName: "유저 이름",
      userImage: "/png/hamster.png",
      text: commentBody,
    };

    onSubmit(newComment);
    setCommentBody("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(e.target.value);
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <div className="w-full my-2">
        <textarea
          className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-15 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          name="body"
          placeholder="댓글 달기.."
          value={commentBody}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="w-full flex justify-end px-3">
        <input
          type="submit"
          className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
          value="댓글 작성"
        />
      </div>
    </form>
  );
};

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <div className=" bg-white rounded-lg border mt-4 mb-1">
      <h3 className="font-bold mx-3 mt-3 ">댓글</h3>
      <div className="flex flex-col mt-2">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-md p-3 mx-3 mb-3">
            <div className="flex gap-3 items-center">
              <Image
                src={comment.userImage}
                className="object-cover w-8 h-8 rounded-full border-2"
                width={32}
                height={32}
                alt={comment.userName}
              />
              <h3 className="font-bold">{comment.userName}</h3>
            </div>
            <p className="text-gray-600 mt-2">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/*   clientComponent    */
const ClientComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { openModal, ModalWrapper } = useModal();
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태 관리

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleCommentSubmit = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setShowComments(true);
  };

  const locations = [
    { name: "용용선생", description: "식당" },
    { name: "스타벅스", description: "카페" },
    { name: "대박장소", description: "명소" },
    { name: "레전드맛집", description: "식당" },
    { name: "신라호텔", description: "숙소" },
    { name: "아이콘은", description: "바꾸면됨" },
    { name: "선굵기도", description: "바꾸면됨" },
    { name: "하루일정이", description: "너무많음어캄" },
    { name: "날짜도", description: "넣으면댐" },
  ];

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
            <DetailsTable />
            <div className="flex items-center justify-center mt-4">
              <TogetherBtn onClick={openModal} />
            </div>
          </div>
        </div>

        <TravelBar locations={locations} />

        <div className="text-sm leading-6">
          <figure className="relative flex flex-col bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
            <figcaption className="flex items-center space-x-4 ml-6 mb-3">
              <Image
                src="/png/hamster2.png"
                alt="image"
                width={56}
                height={56}
                className="flex-none w-14 h-14 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="flex">
                <div className="text-base text-slate-900 font-semibold dark:text-slate-200 mr-2">
                  John Doe
                </div>
                <IconButton
                  src="/svg/send.svg"
                  alt="보내기버튼"
                  width={25}
                  height={25}
                />
              </div>
            </figcaption>
            <div className="flex">
              <div className="w-1/2">
                <ImgSlider />
              </div>
              <div className=" w-1/2 flex-col">
                <div>
                  <div className=" bg-white rounded-lg border p-5 ">
                    <div className="border rounded-lg h-96 overflow-y-auto p-4">
                      여미랑 같이 남해로 워케이션 가실 분? (ꔷ̥̑.̮ꔷ̥̑) 어차피 일해야
                      한다면 #남해로출근 👥👤👥👤(무료래 웅성웅성) 추석 연휴
                      뒤에 휴가 못 붙인 여미 담당자😭 사무실 나가기 싫은 핑계로
                      워케이션을 가려고 합니다. 떠오르는 워케이션 성지! 남해로
                      가려는데 같이 일하러(?) 여행하러(?) 가실 분 손!! 🙌
                      💻여미와 함께하는 남해 워케이션 정보 - 워케이션 기간 :
                      2023. 10. 4(수) ~ 10. 7(토) - 제공사항 : 서울 ↔ 남해 왕복
                      차량 이동, 남해 현지 워케이션 공간, 숙소, 식사, 여행자보험
                      - 불포함사항 : 타 지역에서 남해 왕복 시 교통비 미지원,
                      개인 경비 👥이런 분들 지원해보세요 - 나는 워케이션 가능한
                      직종이다. (개발자, 콘텐츠 마케터, 원격 업무 가능한
                      1인사업자 등) - 새로운 곳에서 일하고 저녁에는 같이 간
                      사람들과 수다떨고 싶다. (숙소에서 같이 바베큐 파뤼) -
                      남들은 어떻게 일하는지 궁금하고 영감을 얻고 싶다. - 바다가
                      보이는 숙소에서 일하고 싶다. - 여행에미치다는 어떻게
                      일하는지 궁금하다. 🗒️그래서 지원은 어떻게? - 프로필링크
                      내에 포함된 ‘워케이션 신청 양식’으로 접속해서
                      신청해주세요. - 지원 기간 : 2023. 9. 13(수) ~ 17(일) 23:59
                      - 선정 발표 : 2023. 9. 20(수) *여행에미치다 공식 계정을
                      통해 DM 안내 예정 - 모집 인원 : 8명 👨‍💻주요 일정
                      ➊1일차(10/4) - 08시 서울 출발, 13시 남해 도착 - 각자 일
                      봐요👨‍💻 - 같이 일몰 봐요 그리고 저녁 먹으며 수다🌇
                      ➋2일차(10/5) - 오전 요가 프로그램🧘 - 각자 일 봐요👩‍💻 -
                      같이 일몰 봐요 그리고 저녁 먹으며 수다🌇 ➌3일차(10/6) -
                      각자 일 봐요👨‍💻 - 독일마을맥주축제🍻 꺄륵 ➍4일차(10/7) -
                      아침 일찍 남해에서 서울로 출발 ⚠️유의사항 안내 - 실제 일할
                      수 있는 공간 등을 제공하는 프로그램입니다. 여행도 일부
                      포함되지만, 실제 워케이션의 취지를 잘 살릴 수 있는
                      분들께서 신청해주세요. - 선발된 인원은 이후 후기 콘텐츠
                      2건을 작성해야 합니다. (본인 소유의 SNS 채널) - 프로그램은
                      현장 상황에 따라 변동될 수 있습니다. - 별도 비용이 없으나,
                      노쇼 방지를 위한 보증금을 받을 예정입니다.
                    </div>
                    <div className="flex my-5">
                      <ButtonWithHoverImage />
                      <div className="flex items-center">100</div>
                      <IconButton
                        src="/svg/chat.svg"
                        alt="댓글-버튼"
                        className="ml-3"
                        onClick={toggleComments}
                        width={25}
                        height={25}
                      />
                      <div className="flex items-center ml-1">100</div>
                    </div>
                    <MycommentSection onSubmit={handleCommentSubmit} />
                    {showComments && <CommentSection comments={comments} />}
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
      <ModalWrapper content="3" />
    </>
  );
};

export default ClientComponent;
