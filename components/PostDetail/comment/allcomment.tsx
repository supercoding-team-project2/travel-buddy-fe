import Image from "next/image";
import { useState } from "react";

interface MycommentSectionProps {
  onSubmit: (comment: Comment) => void;
}

interface Comment {
  id: number;
  userName: string;
  userImage: string;
  text: string;
}

export const MycommentSection: React.FC<MycommentSectionProps> = ({
  onSubmit,
}) => {
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

export const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
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

export default { MycommentSection, CommentSection };
