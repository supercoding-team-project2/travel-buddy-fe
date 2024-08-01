"use client";

import classNames from "classnames/bind";
import styles from "./change-password.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/Alert/Alert";
import axiosInstance from "@/lib/axiosInstance";

const cx = classNames.bind(styles);

export function ChangePasswordClient() {
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [showCheckPassword, setShowCheckPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const checkAccountAndSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/password/find`,
        {
          email,
          phoneNum,
        }
      );
      if (response.status === 200) {
        setIsCodeSent(true);
      } else if (response.status === 404) {
        setError("계정을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error checking account:", error);
      setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const verifyCodeAndProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/sms-code/check`,
        {
          phoneNum,
          code: verificationCode,
        }
      );
      if (response.status === 200) {
        setIsRegistered(true);
      } else {
        console.error("Failed to verify code");
        setError("인증 코드 확인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validatePassword(newPassword)) {
      setError("6~12자 영문 대 소문자와 숫자를 사용하세요.");
      return;
    }
    if (newPassword !== checkPassword) {
      setError("비밀번호가 서로 같지 않습니다.");
      return;
    }
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/password/update`,
        {
          newPassword,
          email,
        }
      );
      if (response.status === 200) {
        setIsPasswordChanged(true);
      } else {
        console.error("Failed to change password");
        setError("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleCheckPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckPassword(e.target.value);
  };

  const toggleCheckPasswordVisibility = () => {
    setShowCheckPassword(!showCheckPassword);
  };

  const validatePassword = (password: string) => {
    const reg_pw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).{6,12}$/;
    return reg_pw.test(password);
  };

  return (
    <>
      {isPasswordChanged ? (
        <Alert
          errorMessage="비밀 번호가 변경되었습니다"
          buttonText="Login"
          nextLink="/login"
        />
      ) : (
        <div className={cx("ChangePassword")}>
          <div className={cx("whole-wrapper")}>
            <div className={cx("leftWrapper")}>
              <img
                src="/svg/air-balloon.svg"
                alt=""
                className={cx("airBalloon")}
              />
            </div>
            <div className={cx("rightWrapper")}>
              <div className={cx("title")}>비밀번호 변경</div>
              <div className={cx("container")}>
                <form
                  className={cx("formContainer")}
                  onSubmit={checkAccountAndSendCode}
                >
                  {isRegistered === null ? (
                    <>
                      <div className={cx("inputUnit")}>
                        <div className={cx("inputTitle")}>Email</div>
                        <input
                          className={cx("inputContent")}
                          type="text"
                          placeholder="Enter your Email here"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className={cx("inputUnit")}>
                        <div className={cx("inputTitle")}>Phone Number</div>
                        <input
                          className={cx("inputContent")}
                          type="text"
                          placeholder="Enter your Phone Number here"
                          value={phoneNum}
                          onChange={(e) => setPhoneNum(e.target.value)}
                        />
                      </div>
                      {isCodeSent ? (
                        <>
                          <div className={cx("inputUnit")}>
                            <div className={cx("inputTitle")}>Verify Code</div>
                            <input
                              className={cx("inputContent")}
                              type={showCode ? "text" : "password"}
                              placeholder="Enter Verify Code here"
                              value={verificationCode}
                              onChange={(e) =>
                                setVerificationCode(e.target.value)
                              }
                            />
                            {showCode ? (
                              <img
                                src="/svg/eye-open.svg"
                                onClick={() => setShowCode(!showCode)}
                                className={cx("showPasswordButton")}
                              />
                            ) : (
                              <img
                                src="/svg/eye-close.svg"
                                onClick={() => setShowCode(!showCode)}
                                className={cx("showPasswordButton")}
                              />
                            )}
                          </div>
                          <button
                            className={cx("submitButton")}
                            onClick={verifyCodeAndProceed}
                          >
                            인증
                          </button>
                        </>
                      ) : (
                        <button className={cx("getCodeButton")} type="submit">
                          코드 전송
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={cx("inputUnit")}>
                        <div className={cx("inputTitle")}>New Password</div>
                        <input
                          className={cx("inputContent")}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New Password"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          id="pwd1"
                        />
                        {showNewPassword ? (
                          <img
                            src="/svg/eye-open.svg"
                            onClick={toggleNewPasswordVisibility}
                            className={cx("showPasswordButton")}
                          />
                        ) : (
                          <img
                            src="/svg/eye-close.svg"
                            onClick={toggleNewPasswordVisibility}
                            className={cx("showPasswordButton")}
                          />
                        )}
                      </div>
                      <div className={cx("inputUnit")}>
                        <div className={cx("inputTitle")}>Check Password</div>
                        <input
                          className={cx("inputContent")}
                          type={showCheckPassword ? "text" : "password"}
                          placeholder="New Password Check"
                          value={checkPassword}
                          onChange={handleCheckPasswordChange}
                          id="pwd2"
                        />
                        {showCheckPassword ? (
                          <img
                            src="/svg/eye-open.svg"
                            onClick={toggleCheckPasswordVisibility}
                            className={cx("showPasswordButton")}
                          />
                        ) : (
                          <img
                            src="/svg/eye-close.svg"
                            onClick={toggleCheckPasswordVisibility}
                            className={cx("showPasswordButton")}
                          />
                        )}
                      </div>
                      {error && <div className={cx("checkError")}>{error}</div>}
                      <button
                        className={cx("submitButton")}
                        onClick={changePassword}
                      >
                        확인
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
