import React, { useEffect } from 'react';
import './login.component.scss';

function Login() {
  const handleForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log('mouting');
  }, []);
  return (
    <section className='loginComponent'>
      <p>
        Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm
        nhiều ưu đãi từ chương trình thành viên Galaxy Cinema.
      </p>
      <form onSubmit={handleForm} className='formLogin'>
        <input type='text' placeholder='Tài khoản' />
        <input type='password' placeholder='Mật khẩu' />
        <button type='submit' className='loginSubmit'>
          ĐĂNG NHẬP
        </button>
      </form>
    </section>
  );
}

export default Login;
