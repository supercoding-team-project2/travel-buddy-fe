'use client';
import classNames from 'classnames/bind';
import styles from './SignUp.module.css';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

export function SignUpClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/svg/add-profile-image.svg');
  const [idNum1, setIdNum1] = useState<string>('OOOOOO'); // 주민등록번호 앞자리 초기값
  const [idNum2, setIdNum2] = useState<string>('Oㅁㅁㅁㅁㅁㅁ'); // 주민등록번호 뒷자리 초기값
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 주민등록번호 앞자리 입력 핸들러
  const handleIdNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/[^0-9]/g, '')
      .substring(0, 6)
      .padEnd(6, 'O');
    setIdNum1(value);
  };

  // 주민등록번호 뒷자리 입력 핸들러
  const handleIdNum2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/[^0-9]/g, '')
      .substring(0, 6)
      .replace(/^([0-9])([0-9]{5})$/, 'O$2')
      .padEnd(7, 'ㅁ');
    setIdNum2(value);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cx('SignUp')}>
      <div className={cx('leftWrapper')}>
        <img src="/svg/air-balloon.svg" alt="" className={cx('airBalloon')} />
      </div>
      <div className={cx('rightWrapper')}>
        <div className={cx('title')}>Sign Up</div>
        <form className={cx('container')}>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Name</div>
            <input className={cx('inputContent')} type="text" placeholder="Enter your Name here" />
          </div>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Email</div>
            <input className={cx('inputContent')} type="text" placeholder="Enter your Email here" />
          </div>
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>Password</div>
            <input
              className={cx('inputContent')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your Password here"
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <img src="/svg/eye-open.svg" onClick={togglePasswordVisibility} className={cx('showPasswordButton')} />
            ) : (
              <img src="/svg/eye-close.svg" onClick={togglePasswordVisibility} className={cx('showPasswordButton')} />
            )}
          </div>
          {/* <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>주민등록번호</div>
            <div className={cx('idNumberInput')}>
              <div className={cx('idNumberFront')}>
                {idNum1.split('').map((char, index) => (
                  <div key={index} className={cx('circle', { filled: char !== 'O' })}>
                    {char}
                  </div>
                ))}
              </div>
              -
              <div className={cx('idNumberBack')}>
                {idNum2.split('').map((char, index) => (
                  <div key={index} className={cx('circle', { filled: char !== 'O' && char !== 'ㅁ' })}>
                    {char}
                  </div>
                ))}
              </div>
            </div>
            <input
              className={cx('inputContent', 'idNumberFrontInput')}
              type="text"
              maxLength={6}
              value={idNum1.replace(/O/g, '')}
              onChange={handleIdNum1Change}
            />
            <input
              className={cx('inputContent', 'idNumberBackInput')}
              type="text"
              maxLength={7}
              value={idNum2.replace(/O|ㅁ/g, '')}
              onChange={handleIdNum2Change}
            />
          </div> */}
          <div className={cx('inputUnit')}>
            <div className={cx('inputTitle')}>프로필 사진</div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <input
              className={cx('inputImageContent')}
              type="image"
              src={imageSrc}
              alt="Upload Image"
              onClick={handleImageClick}
            />
          </div>
          <button className={cx('submitButton')} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
