import Image from "next/image";
const cx = classNames.bind(styles);
import styles from "../../app/(Pages)/PostDetail/PostDetail.module.css";
import classNames from "classnames/bind";

//any말고 inteface로 타입 정해서 하기...
export const IconButton = ({
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
