// 'use client';

// import axiosInstance from '@/lib/axiosInstance';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function OAuth2RedirectHandler() {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [token, setToken] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await axiosInstance.post(
//           `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/oauth2-jwt-header`,
//           {},
//           {
//             withCredentials: true,
//           }
//         );

//         if (response.status === 200) {
//           const token = response.headers['authorization'];
//           if (typeof window !== 'undefined') {
//             localStorage.setItem('token', token);
//           }
//           router.push('/');
//         } else {
//           console.error('Fetch failed');
//           //router.push('/login');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         //router.push('/login');
//       }
//     };
//     fetchToken();
//   }, [router]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const cookies = document.cookie.split(';').reduce((acc: { [key: string]: string }, cookie) => {
//         const [key, value] = cookie.split('=');
//         acc[key.trim()] = value;
//         return acc;
//       }, {});

//       console.log(cookies);

//       const token = cookies.token;

//       if (token) {
//         // 로컬스토리지에 토큰 저장
//         localStorage.setItem('token', token);
//         setToken(token);
//         setIsLoggedIn(true);
//       } else {
//         // 로컬스토리지에서 토큰을 읽어옴
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//           setToken(storedToken);
//           setIsLoggedIn(true);
//         }
//       }
//     }
//   }, []);

//   return <div>{isLoggedIn ? <p>Logged in with token: {token}</p> : <p>Not logged in</p>}</div>;
// }

'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function OAuth2RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      // 원하는 경로로 리다이렉트
      router.push('/');
    } else {
      // 에러 처리 또는 로그인 페이지로 리다이렉트
      router.push('/login');
    }
  }, [router]);

  return null;
}
