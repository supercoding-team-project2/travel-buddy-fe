import classNames from "classnames/bind";
import styles from "./CourseCard.module.css";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

interface Props {
  id: number;
  author: string;
  date: string;
  title: string;
  likes: number;
  url: string;
}

export function CourseCard({ id, author, date, title, likes, url }: Props) {
  const router = useRouter();

  const formatDate = (date: string) => {
    const firstSplitDate = date.split(" ")[0];
    const [year, month, day] = firstSplitDate.split("-");

    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    return `${year}년 ${monthNum}월 ${dayNum}일`;
  };

  return (
    <div
      className={cx("CourseCard")}
      onClick={() => router.push(`/post-detail/${id}`)}
    >
      <img src={url} alt="" className={cx("courseImg")} />
      <div className={cx("detail-container")}>
        <div className={cx("name")}>{author}</div>
        <div className={cx("date")}>{formatDate(date)}</div>
        <div className={cx("courseTitle")}>{title}</div>
        <div className={cx("line")}></div>
        <div className={cx("like-container")}>
          <img src="/png/like-1.png" width={17} height={17} />
          <div>{likes}</div>
        </div>
      </div>
    </div>
  );
}
