import { Alert } from '@/components/Alert/Alert';
import { SignUpClient } from './clientComponent';

export default function SignUp({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  if (!searchParams.phoneNum) {
    return <Alert errorMessage="휴대폰 번호 인증이 필요합니다." buttonText="확인" nextLink="/verify-phone" />;
  }
  return <SignUpClient phoneNum={searchParams.phoneNum} />;
}
