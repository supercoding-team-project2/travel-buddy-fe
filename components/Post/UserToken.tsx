import { jwtDecode } from "jwt-decode";

const getToken = () => {
  return sessionStorage.getItem("token");
};

export const userToken = getToken();

export const currentUserId = () => {
  if (userToken) {
    // token이 null이 아닐 경우에만 디코드 실행
    const decoded: any = jwtDecode(userToken);
    return decoded.userId;
  } else {
    console.error("No token found in session storage.");
  }
};
