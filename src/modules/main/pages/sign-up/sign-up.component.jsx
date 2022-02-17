import React from 'react';
import './sign-up.component.scss';

function SignUp() {
  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className='formSignUp'>
        <input type='text' placeholder='Họ Tên' />
        <input type='text' placeholder='Tài Khoản' />
        <div className='passwordContain'>
          <input type='password' placeholder='mật Khẩu' />
          <input type='password' placeholder='Nhập lại mật khẩu' />
        </div>

        <input type='email' placeholder='Email' />
        <input type='number' placeholder='Số Điên Thoại' />
        <button type='submit' className='SignUpSubmit'>
          ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
}

export default SignUp;
