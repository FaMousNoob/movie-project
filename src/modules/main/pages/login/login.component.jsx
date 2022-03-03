import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../../store/actions/auth.action';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './login.component.scss';
import Input from '../../components/input-field/input..component';

function Login() {
  const dispatch = useDispatch();
  const [userExist, setuserExist] = useState({ message: '' });

  const validate = Yup.object({
    taiKhoan: Yup.string().required('Tài khoản không được để trống.'),
    matKhau: Yup.string().required('mật khẩu không được để trống.'),
  });

  // call dispatch
  const handleSubmit = async (values) => {
    await dispatch(loginAction(values));

    const loginFailed = JSON.parse(localStorage.getItem('loginFailed'));
    console.log(loginFailed);
    if (loginFailed) {
      setuserExist({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    }
    console.log(localStorage);
  };

  return (
    <Formik
      initialValues={{
        taiKhoan: '',
        matKhau: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}>
      {(formik) => (
        <section className='loginComponent'>
          <p className='loginNotify'>
            Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận
            thêm nhiều ưu đãi từ chương trình thành viên Galaxy Cinema.
          </p>
          <Form className='formLogin'>
            <button
              onClick={() => {
                console.log(JSON.parse(localStorage.getItem('loginFailed')));
                console.log(setuserExist.message);
              }}>
              printing
            </button>
            <Input placeholder='Tài khoản' name='taiKhoan' type='text' />
            <Input placeholder='Mật khẩu' name='matKhau' type='password' />
            {/* <input
              name='taiKhoan'
              type='text'
              placeholder='Tài khoản'
              value={userLogin.taiKhoan}
              onChange={handleChange}
            />
            <input
              name='matKhau'
              type='password'
              placeholder='Mật khẩu'
              value={userLogin.matKhau}
              onChange={handleChange}
            /> */}
            <p className='loginFailed'>{userExist.message}</p>
            <button type='submit' className='loginSubmit'>
              ĐĂNG NHẬP
            </button>
          </Form>
        </section>
      )}
    </Formik>
    // <section className='loginComponent'>
    //   <p>
    //     Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm
    //     nhiều ưu đãi từ chương trình thành viên Galaxy Cinema.
    //   </p>
    //   <form onSubmit={handleForm} className='formLogin'>
    //     <input
    //       name='taiKhoan'
    //       type='text'
    //       placeholder='Tài khoản'
    //       value={userLogin.taiKhoan}
    //       onChange={handleChange}
    //     />
    //     <input
    //       name='matKhau'
    //       type='password'
    //       placeholder='Mật khẩu'
    //       value={userLogin.matKhau}
    //       onChange={handleChange}
    //     />

    //     <p className='alert alert-danger'></p>

    //     <button type='submit' className='loginSubmit' onClick={handleForm}>
    //       ĐĂNG NHẬP
    //     </button>
    //   </form>
    // </section>
  );
}

export default Login;
