import classNames from "classnames/bind";
import styles from "./Footer.module.css";
import Link from "next/link";

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <>
      <div className={cx("Footer")}>
        <div className={cx("Footer-name")}>travelBuddy</div>
        <div className={cx("Footer-link-container")}>
          <Link href="/" className={cx("link-home")}>
            Home
          </Link>
          <Link href="/" className={cx("link-guide")}>
            가이드
          </Link>
          <Link href="/" className={cx("link-together")}>
            동행
          </Link>
          <div className={cx("copyright")}>
            © 2024 travelBuddy. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}
