import { ButtonWithHoverImage } from "./buttonClick";
import { translateCategory } from "./translateCategory";

interface Post {
  id: number;
  categoryEnum: string;
  title: string;
  summary: string;
  author: string;
  startAt: string;
  endAt: string;
  representativeImage: string;
  likeCount: number;
}

interface PostCardProps {
  posts: Post[];
  onPostClick: (id: number) => void;
}

export const PostCard = ({ posts, onPostClick }: PostCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 p-10 md:px-20">
      {posts?.map((post: any, id: any) => (
        <div
          key={id}
          className="bg-white rounded-xl shadow-md overflow-hidden min-h-[25rem] min-w-[40rem]"
          onClick={() => onPostClick(post.id)}
        >
          <div className="relative">
            <img
              className="w-full h-72 object-cover"
              src={post.representativeImage}
              alt="Placeholder"
            />
            <div className="absolute bottom-0 right-0  bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
              {translateCategory(post.category)}
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <div className="text-lg font-medium text-gray-800">
                {post.title}
              </div>
              <div className="flex">
                <ButtonWithHoverImage initialLikes={post.likeCount} />
              </div>
            </div>
            <div className="flex">
              <div className="text-sm font-bold text-gray-800 mb-2">
                {post.author}
              </div>

              <div className="text-sm font-medium text-gray-800 mb-2 ml-3">
                여행 날짜: {post.startAt} ~ {post.endAt}
              </div>
            </div>
            <p className="text-gray-500 text-sm">{post.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
