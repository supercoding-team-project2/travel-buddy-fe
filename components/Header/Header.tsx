"use client";

import classNames from "classnames/bind";
import styles from "./Header.module.css";

import Image from "next/image";
import account from "../../assets/account.png";
import chat from "../../assets/chat.png";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { noLayoutRoutes } from "@/lib/constants";
import axiosInstance from "@/lib/axiosInstance";

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, [pathname]);

  const noLayout = noLayoutRoutes.some((route) =>
    new RegExp(`^${route}(/|$)`).test(pathname)
  );
  if (noLayout) return <></>;

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/disconnect`,
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.log("로그아웃 중 오류가 발생했습니다.");
      console.log(error);
    }
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={cx("Header")}>
      <div className={cx("company-container")}>
        <div className={cx("company-logo")} onClick={() => router.push("/")}>
          Travel Buddy
        </div>
      </div>
      <div className={cx("navigatation-user-container")}>
        <div className={cx("nav-wrapper")}>
          <div
            className={cx("header-nav", {
              "header-home-active": pathname === "/",
            })}
            onClick={() => router.push("/")}
          >
            Home
          </div>
          <div
            className={cx("header-nav", {
              "header-explore-active": pathname === "/post-view",
            })}
            onClick={() => router.push("/post-view")}
          >
            Explore
          </div>
        </div>

        {token ? (
          <div className={cx("after-login")}>
            <button className={cx("logout-button")} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={cx("before-login")}>
            <button
              className={cx("login-button")}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className={cx("signup-button")}
              onClick={() => router.push("/verify-phone")}
            >
              Sign up
            </button>
          </div>
        )}
        <div className={cx("icon-wrapper")}>
          <Image
            className={cx("account-icon")}
            src={account}
            alt="account-icon"
            onClick={() => router.push("/my-page")}
          />
          <Image
            className={cx("chat-icon")}
            src={chat}
            alt="chat-icon"
            onClick={() => router.push("/chat-room-list")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
