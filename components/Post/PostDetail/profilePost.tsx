import Image from "next/image";
import ImgSlider from "./ImgSlider";
import styles from "@/app/(Pages)/post-detail/post-detail.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { CommentSection, MycommentSection } from "./comment/allcomment";
import api from "@/app/api/api";
import axiosInstance from "@/lib/axiosInstance";
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
    authorID: string;
    likeCount: number;
    images: string[];
  };
  // likeStatus: {
  //   status: boolean;
  // };
  getData: () => Promise<void>;
}

/* 메인 프로필 포스트 */
export const ProfilePost = ({ data, getData }: Props) => {
  const board = data;
  const postId = board.id;
  const authorID = board.authorID;
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0); // 댓글 수 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태 관리
  const [likeCount, setLikeCount] = useState<number>(board?.likeCount || 0); //좋아요 수 상태
  const [isLike, setIsLike] = useState<boolean>(false); //좋아요 수 상태 관리

  interface Comment {
    userName: string;
    profileImgUrl: string;
    comment: string;
    id: number;
  }

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, []);

  useEffect(() => {}, [isLike]);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, postId]);

  function parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const enterChatRoom = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("로그인 정보가 없습니다.");
        return;
      }
      const senderId = parseJwt(token).userId;
      const opponentId = authorID;
      console.log(senderId);
      // const senderId = 1;
      // const opponentId = 2;
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/room/enter`,
        {
          senderId,
          opponentId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const chatRoomId = response.data.chatRoomId;
        window.open(
          `/chat/${chatRoomId}`,
          "_blank",
          "noopener,noreferrer,width=540,height=640"
        );
      } else {
        console.error("방 생성 실패:", response.data.message);
      }
    } catch (error) {
      console.error("방 생성 에러:", error);
    }
  };

  /* 좋아요 조회 요청 */
  const fetchLikes = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await api.get(`/api/likes/info/${postId}`, {
        headers: { Authorization: token },
      });
      setLikeCount(response.data.count);
      setIsLike(response.data.like);
    } catch (error: any) {
      console.error("Server responded with error:", error.response);
    }
  };

  /* 댓글 조회 요청 */
  const fetchComments = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(`/api/comment/${postId}`);
      const { commentList } = response.data;
      setComments(commentList);
      setCommentCount(commentList.length);
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

  /* 좋아요 클릭 요청 */
  const handleLike = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    if (isLike) {
      console.log("이미 좋아요를 누른 상태입니다.");
      return;
    }
    setIsLike(true);
    setLikeCount(likeCount + 1);
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
      setIsLike(false);
      setLikeCount(likeCount - 1);
    }
  };

  /* 좋아요 취소 요청 */
  const handleDislike = async () => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    if (!isLike) {
      console.log("이미 좋아요를 취소한 상태입니다.");
      return;
    }
    setIsLike(false);
    setLikeCount(likeCount - 1);
    try {
      const response = await api.delete(`/api/likes/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("좋아요 취소 성공.");
    } catch (error) {
      console.error("Error handling dislike request:", error);
      setIsLike(true);
      setLikeCount(likeCount + 1);
    }
  };

  /* 댓글 토글 - 보여줄때 */
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  /* 댓글 작성 */
  const handleCommentSubmit = (newComment: Comment) => {
    setComments((prevComments) =>
      prevComments ? [newComment, ...prevComments] : [newComment]
    );
    if (!showComments) {
      setShowComments(true); // 댓글 작성 후 댓글 섹션이 표시되도록 설정
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
            width={30}
            height={30}
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
                enterChatRoom();
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
                    isLiked={isLike}
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
                  <div className="flex items-center ml-1">{commentCount}</div>
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
