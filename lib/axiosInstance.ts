import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.response.data.message === 'access token is expired') {
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (refreshToken) {
//           const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/reissue`, null, {
//             headers: {
//               refresh: refreshToken,
//             },
//           });
//           if (response.status === 200) {
//             const newToken = response.headers.authorization;
//             const newRefreshToken = response.data;
//             localStorage.setItem('token', newToken);
//             localStorage.setItem('refreshToken', newRefreshToken);

//             // 새로운 토큰으로 원래 요청 다시 시도
//             originalRequest.headers['Authorization'] = newToken;
//             return axios(originalRequest);
//           }
//         }
//       } catch (refreshError) {
//         console.error('토큰 재발급 실패:', refreshError);
//         // 로그아웃 처리 혹은 다른 에러 처리 로직 추가
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
