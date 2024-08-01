import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./SuccessSignUp.module.css";

const cx = classNames.bind(styles);

const SuccessSignUp = () => {
  const router = useRouter();

  return (
    <div className={cx("success-container")}>
      <div className={cx("success")}>
        <div className={cx("success-statement")}>
          <span className={cx("success-name")}>Travel Buddy</span>의 회원이 되신 걸 환영합니다!
        </div>
        <div className={cx("success-introduction")}>
          어떤 여행들이 있는지 자세히 알아볼까요?
        </div>
      </div>
      <div className={cx("welcome-image-container")}>
        <img
          src="/png/congrats.png"
          alt="welcome"
          className={cx("welcome-image")}
        />
      </div>
      <div className={cx("button-container")}>
        <button className={cx("home-button")} onClick={() => router.push("/")}>홈</button>
        <button className={cx("login-button")} onClick={()=> router.push("/login")}>로그인</button>
      </div>
    </div>
  );
};

export default SuccessSignUp;
