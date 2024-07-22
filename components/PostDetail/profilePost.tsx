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

interface Board {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  likeCount: number;
  images: string[];
}

interface Props {
  data: {
    board: Board;
  };
}

/*메인 프로필 포스트 */
const ProfilePost = ({ data }: Props) => {
  const { board } = data;
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
              {board.author}
            </div>
            <IconButton
              src="/svg/send.svg"
              alt="보내기버튼"
              width={25}
              height={25}
              onClick={() => {
                window.open(
                  "/chat",
                  "_blank",
                  "noopener,noreferrer,width=540,height=640"
                );
              }}
            />
          </div>
        </figcaption>
        <div className="flex">
          <div className="w-1/2">
            {/* 여행사진들 받는 거 구현 */}
            <ImgSlider img={board.images} />
          </div>
          <div className=" w-1/2 flex-col">
            <div>
              <div className=" bg-white rounded-lg border p-5 ">
                {/* 본문내용 구현 */}
                <div className="border rounded-lg h-96 overflow-y-auto p-4">
                  {board.content}
                </div>
                <div className="flex my-5">
                  <ButtonWithHoverImage />
                  {/* 좋아요 갯수 */}
                  <div className="flex items-center"> {board.likeCount}</div>
                  <IconButton
                    src="/svg/chat.svg"
                    alt="댓글-버튼"
                    className="ml-3"
                    onClick={toggleComments}
                    width={25}
                    height={25}
                  />
                  {/* 댓글갯수 */}
                  <div className="flex items-center ml-1">20</div>
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
