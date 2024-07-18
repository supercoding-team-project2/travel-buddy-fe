import Image from "next/image";
import ImgSlider from "./ImgSlider";
import styles from "../../app/(Pages)/PostDetail/PostDetail.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import { CommentSection, MycommentSection } from "./comment/allcomment";
const cx = classNames.bind(styles);

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

const ProfilePost = () => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태 관리

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  interface Comment {
    id: number;
    userName: string;
    userImage: string;
    text: string;
  }

  const handleCommentSubmit = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setShowComments(true);
  };

  return (
    <div className="text-sm leading-6">
      <figure className="relative flex flex-col bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <figcaption className="flex items-center space-x-4 ml-6 mb-3">
          {/* 프로필사진 <<--- 데이터화시키기 */}
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
            {/* 프로필 이름 */}
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
            {/* 여행사진들 받는 거 구현 */}
            <ImgSlider />
          </div>
          <div className=" w-1/2 flex-col">
            <div>
              <div className=" bg-white rounded-lg border p-5 ">
                {/* 본문내용 구현 */}
                <div className="border rounded-lg h-96 overflow-y-auto p-4">
                  여미랑 같이 남해로 워케이션 가실 분? (ꔷ̥̑.̮ꔷ̥̑) 어차피 일해야
                  한다면 #남해로출근 👥👤👥👤(무료래 웅성웅성) 추석 연휴 뒤에
                  휴가 못 붙인 여미 담당자😭 사무실 나가기 싫은 핑계로
                  워케이션을 가려고 합니다. 떠오르는 워케이션 성지! 남해로
                  가려는데 같이 일하러(?) 여행하러(?) 가실 분 손!! 🙌 💻여미와
                  함께하는 남해 워케이션 정보 - 워케이션 기간 : 2023. 10. 4(수)
                  ~ 10. 7(토) - 제공사항 : 서울 ↔ 남해 왕복 차량 이동, 남해 현지
                  워케이션 공간, 숙소, 식사, 여행자보험 - 불포함사항 : 타
                  지역에서 남해 왕복 시 교통비 미지원, 개인 경비 👥이런 분들
                  지원해보세요 - 나는 워케이션 가능한 직종이다. (개발자, 콘텐츠
                  마케터, 원격 업무 가능한 1인사업자 등) - 새로운 곳에서 일하고
                  저녁에는 같이 간 사람들과 수다떨고 싶다. (숙소에서 같이 바베큐
                  파뤼) - 남들은 어떻게 일하는지 궁금하고 영감을 얻고 싶다. -
                  바다가 보이는 숙소에서 일하고 싶다. - 여행에미치다는 어떻게
                  일하는지 궁금하다. 🗒️그래서 지원은 어떻게? - 프로필링크 내에
                  포함된 ‘워케이션 신청 양식’으로 접속해서 신청해주세요. - 지원
                  기간 : 2023. 9. 13(수) ~ 17(일) 23:59 - 선정 발표 : 2023. 9.
                  20(수) *여행에미치다 공식 계정을 통해 DM 안내 예정 - 모집 인원
                  : 8명 👨‍💻주요 일정 ➊1일차(10/4) - 08시 서울 출발, 13시 남해
                  도착 - 각자 일 봐요👨‍💻 - 같이 일몰 봐요 그리고 저녁 먹으며
                  수다🌇 ➋2일차(10/5) - 오전 요가 프로그램🧘 - 각자 일 봐요👩‍💻 -
                  같이 일몰 봐요 그리고 저녁 먹으며 수다🌇 ➌3일차(10/6) - 각자
                  일 봐요👨‍💻 - 독일마을맥주축제🍻 꺄륵 ➍4일차(10/7) - 아침 일찍
                  남해에서 서울로 출발 ⚠️유의사항 안내 - 실제 일할 수 있는 공간
                  등을 제공하는 프로그램입니다. 여행도 일부 포함되지만, 실제
                  워케이션의 취지를 잘 살릴 수 있는 분들께서 신청해주세요. -
                  선발된 인원은 이후 후기 콘텐츠 2건을 작성해야 합니다. (본인
                  소유의 SNS 채널) - 프로그램은 현장 상황에 따라 변동될 수
                  있습니다. - 별도 비용이 없으나, 노쇼 방지를 위한 보증금을 받을
                  예정입니다.
                </div>
                <div className="flex my-5">
                  <ButtonWithHoverImage />
                  {/* 좋아요 갯수 */}
                  <div className="flex items-center">100</div>
                  <IconButton
                    src="/svg/chat.svg"
                    alt="댓글-버튼"
                    className="ml-3"
                    onClick={toggleComments}
                    width={25}
                    height={25}
                  />
                  {/* 댓글갯수 */}
                  <div className="flex items-center ml-1">100</div>
                </div>
                {/* 댓글 관리하기 */}
                <MycommentSection onSubmit={handleCommentSubmit} />
                {showComments && <CommentSection comments={comments} />}
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default ProfilePost;
