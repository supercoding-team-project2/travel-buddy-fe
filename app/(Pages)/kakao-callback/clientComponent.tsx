import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

export function KakaoCallbackClient() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const { code } = router.query;
      if (code) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/kakao-login`,
            { code },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const token = response.data.token;
          localStorage.setItem('token', token);
          router.push('/');
        } catch (error) {
          console.error('카카오 로그인 실패', error);
        }
      }
    };

    fetchToken();
  }, [router.query]);

  return <div>로그인 중...</div>;
}
