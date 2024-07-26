import Image from "next/image";
import ImgSlider from "./ImgSlider";
import styles from "@/app/(Pages)/post-detail/post-detail.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import { CommentSection, MycommentSection } from "./comment/allcomment";
const cx = classNames.bind(styles);

/* 버튼 컴포넌트 */
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
// const ButtonWithHoverImage = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const handleClick = () => {
//     setIsClicked((prev) => !prev);
//   };

//   return (
//     <button
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={handleClick}
//     >
//       <Image
//         src={
//           isClicked || isHovered
//             ? "/svg/thumbs-up-fill.svg"
//             : "/svg/thumbs-up.svg"
//         }
//         width={30}
//         height={30}
//         alt="좋아요"
//       />
//     </button>
//   );
// };

const ButtonWithHoverImage = ({
  onLike,
  onDislike,
  isLiked,
}: {
  onLike: () => void;
  onDislike: () => void;
  isLiked: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => (isLiked ? onDislike() : onLike())}
    >
      <Image
        src={
          isLiked || isHovered
            ? "/svg/thumbs-up-fill.svg"
            : "/svg/thumbs-up.svg"
        }
        width={30}
        height={30}
        alt="좋아요"
      />
    </button>
  );
};

interface Props {
  data: {
    id: number;
    title: string;
    summary: string;
    content: string;
    category: string;
    userPhoto: string;
    author: string;
    likeCount: number;
    images: string[];
  };
}

/* 메인 프로필 포스트 */
export const ProfilePost = ({ data }: Props) => {
  const board = data;

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태 관리
  const [likeCount, setLikeCount] = useState<number>(board?.likeCount || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 버튼 상태

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

  const handleLike = () => {
    setIsLiked(true);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleDislike = () => {
    setIsLiked(false);
    setLikeCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="text-sm leading-6">
      <figure className="relative flex flex-col bg-slate-100 rounded-lg p-9 dark:bg-slate-800 dark:highlight-white/5">
        <figcaption className="flex items-center space-x-4 ml-6 mb-3">
          {/* 프로필사진 Image*/}
          <Image
            src={board?.userPhoto}
            alt="image"
            width={56}
            height={56}
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex">
            {/* 프로필 이름 */}
            <div className="text-xl text-slate-900 font-bold dark:text-slate-200 mr-2">
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
        <div className="flex gap-11">
          <div className="w-[40rem]">
            {/* 여행사진들 */}
            <ImgSlider img={board?.images} />
          </div>
          <div className="w-[55rem] flex-col">
            <div>
              <div className=" bg-white rounded-lg border p-5 ">
                {/* 본문내용 구현 */}
                <div className="text-lg border rounded-lg h-96 overflow-y-auto p-4">
                  {board.content}
                </div>
                <div className="flex my-5">
                  <ButtonWithHoverImage
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isLiked={isLiked}
                  />
                  {/* 좋아요 갯수 */}
                  <div className="flex items-center"> {likeCount}</div>
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
