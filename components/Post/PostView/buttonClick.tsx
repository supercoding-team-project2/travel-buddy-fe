import Image from "next/image";
import { useState } from "react";

interface ButtonClickProps {
  initialLikes: number;
}

/* 좋아요 클릭 버튼에 대한 */
export const ButtonWithHoverImage = ({ initialLikes }: ButtonClickProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  return (
    <button onClick={handleClick} className="flex">
      <Image
        src={isClicked ? "./svg/thumbs-up-fill.svg" : "./svg/thumbs-up.svg"}
        width={30}
        height={30}
        alt="좋아요"
      />
      <span className="text-lg font-medium text-gray-800">{initialLikes}</span>
    </button>
  );
};
