import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../../store/actions/auth.action';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './login.component.scss';
import Input from '../../components/input-field/input..component';

function Login() {
  //render login failed message
  const [userExist, setuserExist] = useState({ message: '' });
  const dispatch = useDispatch();
  const validate = Yup.object({
    taiKhoan: Yup.string().required('Tài khoản không để trống.'),
    matKhau: Yup.string().required('mật khẩu không để trống.'),
  });

  // call dispatch
  const handleSubmit = async (values) => {
    await dispatch(loginAction(values));

    //alert if user login failed
    const loginFailed = JSON.parse(localStorage.getItem('loginFailed'));
    if (loginFailed) {
      setuserExist({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    }
  };

  return (
    <Formik
      initialValues={{
        taiKhoan: '',
        matKhau: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmit(values);
      }}>
      {(formik) => (
        <section className='loginComponent'>
          <p className='loginNotify'>
            Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận
            thêm nhiều ưu đãi từ chương trình thành viên Galaxy Cinema.
          </p>
          <Form className='formLogin'>
            <Input placeholder='Tài khoản' name='taiKhoan' type='text' />
            <Input placeholder='Mật khẩu' name='matKhau' type='password' />
            <p className='loginFailed'>{userExist.message}</p>
            <button type='submit' className='loginSubmit'>
              ĐĂNG NHẬP
            </button>
          </Form>
        </section>
      )}
    </Formik>
  );
}

export default Login;
