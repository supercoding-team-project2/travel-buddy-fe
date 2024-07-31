import api from "@/app/api/api";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MycommentSectionProps {
  onSubmit: (comment: Comment) => void;
  postId: any;
  fetchComments: () => void;
}

interface Comment {
  userName: string;
  profileImgUrl: string;
  comment: string;
  id: number;
}

/* 댓글 입력 섹션 */
export const MycommentSection: React.FC<MycommentSectionProps> = ({
  onSubmit,
  postId,
  fetchComments,
}) => {
  const [commentBody, setCommentBody] = useState("");

  /*댓글 등록 요청 */
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const newComment: any = {
      userName: "유저 이름",
      profileImgUrl: "/png/hamster.png",
      comment: commentBody,
    };

    setCommentBody("");
    try {
      const response = await api.post(
        `/api/comment/add/${postId}`,
        {
          userName: newComment.userName, // 댓글 작성자 이름
          content: newComment.comment, // 댓글 내용
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Comment submitted successfully:", response.data);
      onSubmit(response.data);
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(e.target.value);
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <div className="w-full my-2">
        <textarea
          className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-15 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
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
  postId: any;
  onCommentUpdate: () => void;
}

/* 댓글 목록 섹션 */
export const CommentSection: React.FC<CommentSectionProps> = ({
  comments: initialComments,
  postId,
  onCommentUpdate,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContents, setEditingContents] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleEdit = (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditingContents((prev) => ({ ...prev, [commentId]: comment.comment }));
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    commentId: number
  ) => {
    setEditingContents((prev) => ({ ...prev, [commentId]: e.target.value }));
  };

  /*댓글 수정 요청 */
  const handleEditSubmit = async (commentId: number) => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await api.put(
        `/api/comment/modify/${postId}/${commentId}`,
        {
          content: editingContents[commentId],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      onCommentUpdate();
      setEditingCommentId(null);
      console.log("Comment updated successfully");
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  /*댓글 삭제 요청  */
  const handleDelete = async (commentId: number) => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server.");
    }
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await api.delete(`/api/comment/delete/${postId}/${commentId}`, {
        headers: {
          Authorization: token,
        },
      });
      onCommentUpdate();
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContents({});
  };

  return (
    <div className="bg-white rounded-lg border mt-4 mb-1">
      <h3 className="font-bold mx-3 mt-3">댓글</h3>
      <div className="flex flex-col-reverse mt-2">
        {comments?.map((comment, index) => (
          <div key={index} className="border rounded-md p-3 mx-3 mb-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Image
                  src={comment.profileImgUrl}
                  className="object-cover w-8 h-8 rounded-full border-2"
                  width={32}
                  height={32}
                  alt={comment.userName}
                />
                <h3 className="font-bold">{comment.userName}</h3>
              </div>
              <div className="flex gap-2">
                {editingCommentId === comment.id ? (
                  <>
                    <button
                      onClick={() => handleEditSubmit(comment.id)}
                      className="px-2 py-1 text-white bg-green-500 rounded"
                      disabled={loading}
                    >
                      저장
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-2 py-1 text-white bg-gray-500 rounded"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(comment.id)}
                      className="px-2 py-1 text-white bg-blue-500 rounded"
                      disabled={loading}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded"
                      disabled={loading}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingCommentId === comment.id ? (
              <textarea
                value={editingContents[comment.id] || ""}
                onChange={(e) => handleEditChange(e, comment.id)}
                className="w-full mt-2 p-2 border rounded"
              />
            ) : (
              <p className="text-gray-600 mt-2">{comment.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
