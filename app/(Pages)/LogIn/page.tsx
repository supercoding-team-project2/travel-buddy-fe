import classNames from 'classnames/bind';
import styles from './LogIn.module.css';
import Link from 'next/link';

const cx = classNames.bind(styles);

export default function LogIn() {
  return (
    <div className={cx('SignIn')}>
      <div className={cx('title')}>로그인</div>
      <div className={cx('container')}>
        <form className={cx('formContainer')}>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Email</div>
            <input className={cx('inputContent')} type="text"></input>
          </div>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Password</div>
            <input className={cx('inputContent')} type="password"></input>
          </div>
          <button className={cx('submitButton')}>Log In</button>
        </form>
        <div className={cx('middleWrapper')}>
          <div className={cx('text')}>
            아직 회원이 아니세요? <Link href={'/SignUp'}>이메일 회원가입</Link>
          </div>
          <hr className={cx('line')} />
          <div className={cx('text')}>소셜 계정으로 로그인 하기</div>
        </div>
        <button className={cx('kakaoLogin')}>카카오 계정으로 시작하기</button>
        <button className={cx('naverLogin')}>네이버 계정으로 시작하기</button>
      </div>
    </div>
  );
}
