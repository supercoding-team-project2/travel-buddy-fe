import Image from "next/image";
import ImgSlider from "./ImgSlider";
import styles from "@/app/(Pages)/post-detail/post-detail.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { CommentSection, MycommentSection } from "./comment/allcomment";
import api from "@/app/api/api";
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

/*좋아요 버튼 컴포넌트 */
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
    userProfile: string;
    author: string;
    likeCount: number;
    images: string[];
  };
}

/* 메인 프로필 포스트 */
export const ProfilePost = ({ data }: Props) => {
  const board = data;
  const postId = board.id;

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태 관리
  const [likeCount, setLikeCount] = useState<number>(board?.likeCount || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 버튼 상태

  interface Comment {
    userName: string;
    profileImgUrl: string;
    comment: string;
    id: number;
  }

  //const token = localStorage.getItem("token");
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjksImlhdCI6MTcyMjE2NzA0OCwiZXhwIjoxNzIyMTg1MDQ4fQ.yCwN7u9QMC5bqNc-sz4WNXYC9l0o48POcz2HRk57BVc";
  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/comment/${postId}`, {
        headers: { Authorization: token },
      });
      const { commentList } = response.data;
      setComments(commentList);
      console.log("조회성공");
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error("You do not have permission to view these comments.");
        console.log(error.response);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  //  const toggleComments = () => {
  //     setShowComments((prev) => !prev);
  //   };
  //   useEffect(() => {
  //     if (!showComments) return;
  //     fetchComments();
  //   }, [showComments]);

  // const toggleComments = async () => {
  //   const newShowComments = !showComments;
  //   setShowComments(newShowComments);
  //   if (newShowComments) {
  //     await fetchComments();
  //   }
  // };

  const toggleComments = () => {
    setShowComments(!showComments);
  };
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, postId]);

  const handleCommentSubmit = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    if (!showComments) {
      setShowComments(true); // 댓글 작성 후 댓글 섹션이 표시되도록 설정
    }
  };

  /*좋아요 클릭 시 */
  // const handleLike = async () => {
  //   setIsLiked(true);
  //   try {
  //     const response = await api.post(
  //       `/api/likes/${postId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     console.log("좋아요 성공:", response.data);
  //   } catch (error) {
  //     console.error("Error like the post:", error);
  //   }
  // };

  const handleLike = async () => {
    if (isLiked) {
      console.log("이미 좋아요를 누른 상태입니다.");
      return;
    }
    setIsLiked(true);
    try {
      const response = await api.post(
        `/api/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("좋아요 성공:", response.data);
    } catch (error) {
      console.error("Error like the post:", error);
      setIsLiked(false);
    }
  };

  /*좋아요 취소 클릭 시 */
  // const handleDislike = async () => {
  //   setIsLiked(false); // 좋아요 상태를 취소로 변경
  //   //const token = localStorage.getItem("token");
  //   try {
  //     const response = await api.delete(`/api/likes/${postId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     console.log("좋아요 취소 성공.");
  //   } catch (error) {
  //     console.error("Error handling dislike request:", error);
  //   }
  // };

  const handleDislike = async () => {
    if (!isLiked) {
      console.log("이미 좋아요를 취소한 상태입니다.");
      return;
    }
    setIsLiked(false);
    try {
      const response = await api.delete(`/api/likes/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("좋아요 취소 성공.");
    } catch (error) {
      console.error("Error handling dislike request:", error);
      setIsLiked(true);
    }
  };

  return (
    <div className="text-sm leading-6">
      <figure className="relative flex flex-col bg-slate-100 rounded-lg p-9 dark:bg-slate-800 dark:highlight-white/5">
        <figcaption className="flex items-center space-x-4 ml-6 mb-3">
          {/* 프로필사진 Image*/}
          <Image
            src={board?.userProfile}
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
          <div className="w-[60rem]">
            {/* 여행사진들 */}
            <ImgSlider img={board?.images} />
          </div>
          <div className="w-[75rem] flex-col">
            <div>
              <div className=" bg-white rounded-lg border p-5 ">
                {/* 본문내용 */}
                <div className="text-lg border rounded-lg h-96 overflow-y-auto p-4">
                  {board.content}
                </div>
                {/* 좋아요 버튼 */}
                <div className="flex my-5">
                  <ButtonWithHoverImage
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isLiked={isLiked}
                  />
                  {/* 좋아요 개수 */}
                  <div className="flex items-center"> {likeCount}</div>
                  {/* 댓글 개수 */}
                  <IconButton
                    src="/svg/chat.svg"
                    alt="댓글-버튼"
                    className="ml-3"
                    onClick={toggleComments}
                    width={25}
                    height={25}
                  />
                  {/* 댓글개수 */}
                  <div className="flex items-center ml-1">20</div>
                </div>
                {/* 댓글 관리하기 */}
                <MycommentSection
                  onSubmit={handleCommentSubmit}
                  postId={postId}
                  fetchComments={fetchComments}
                />
                {showComments && (
                  <CommentSection
                    comments={comments}
                    postId={postId}
                    onCommentUpdate={fetchComments}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};
