import {
  SelectPost,
  ButtonOutline,
  WriteButton,
  ClientComponent,
  PostComponent,
} from "./clientComponent";
import styles from "./PostView.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const page = () => {
  return (
    <div className={cx("post-container")}>
      <div className={cx("post-top-container")}>
        <div className={cx("button-container")}>
          <div className={cx("category-button-group")}>
            <ButtonOutline text="전체" />
            <ButtonOutline text="후기" />
            <ButtonOutline text="동행" />
            <ButtonOutline text="가이드" />
          </div>
          <div className={cx("view-button-group")}>
            <ButtonOutline text="추천한 게시물" />
            <ButtonOutline text="참여한 여행" />
          </div>
        </div>

        <div className={cx("select-write-group")}>
          <div className={cx("select-container")}>
            <SelectPost />
            <ClientComponent />
          </div>

          <div className={cx("write-icon-container")}>
            <WriteButton />
          </div>
        </div>
      </div>
      <PostComponent />
    </div>
  );
};

export default page;
