import { ButtonWithHoverImage } from "./buttonClick";

const category: any = {
  GUIDE: "가이드",
  REVIEW: "후기",
  COMPANION: "동행",
};

const translateCategory = (categoryEnum: string) => {
  return category[categoryEnum] || categoryEnum;
};

export const PostCard = ({ posts }: any) => {
  //console.log(JSON.stringify(posts), "이건 포스트카드에서 입력한 posts임");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 p-10 md:px-20">
      {posts.map((post: any, id: any) => (
        <div
          key={id}
          className="bg-white rounded-xl shadow-md overflow-hidden min-h-[22rem] min-w-[40rem]"
        >
          <div className="relative">
            <img
              className="w-full h-64 object-cover"
              src={post.representativeImage}
              alt="Placeholder"
            />
            <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-md text-xs">
              {translateCategory(post.categoryEnum)}
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
