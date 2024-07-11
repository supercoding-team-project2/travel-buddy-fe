import classNames from "classnames/bind";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <>
      <div className={cx("Footer")}>
        <div className={cx("Footer-name-container")}>
          <div className={cx("Footer-name")}>travelBuddy</div>
          <div className={cx("Footer-github")}>
            <a
              href="https://github.com/supercoding-team-project2/travel-buddy-fe"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("Footer-github")}
            >
              <Image
                src="/github.svg"
                alt="GitHub Logo"
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>

        <div className={cx("Footer-link-container")}>
          <Link href="/" className={cx("link-home")}>
            Home
          </Link>
          <Link href="/" className={cx("link-guide")}>
            Explore
          </Link>
          <div className={cx("copyright")}>
            © Copyright 2024. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}
