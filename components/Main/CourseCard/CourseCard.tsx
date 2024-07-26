import classNames from "classnames/bind";
import styles from "./CourseCard.module.css";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

interface Props {
  id: number;
  title: string;
  url: string;
}

export function CourseCard({ id, title, url }: Props) {
  const router = useRouter();
  return (
    <div className={cx("CourseCard")} onClick={() => router.push(`/post-detail/${id}`)}>
      <img src={url} alt="" className={cx("courseImg")} />
      <div className={cx("title-container")}>
      <div className={cx("courseTitle")}>{title}</div>
 </div>
    </div>
  );
}
