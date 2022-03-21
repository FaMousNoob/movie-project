import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './sign-up.component.scss';
import Input from '../../components/input-field/input..component';
import { signUpAction } from '../../../../store/actions/sign-up.action';

function SignUp(props) {
  const [state, setState] = useState({ signUpFail: false });

  const validate = Yup.object({
    hoTen: Yup.string()
      .min(5, 'Họ Tên không ít hơn 5 kí tự')
      .max(30, 'Họ Tên không quá 30 kí tự')
      .required('Họ Tên không để trống'),
    taiKhoan: Yup.string()
      .min(5, 'Tài khoản không ít hơn 5 kí tự')
      .max(30, 'Tài khoản không quá 30 kí tự')
      .required('Tài khoản được để trống'),
    matKhau: Yup.string()
      .min(5, 'Mật khẩu không ít hơn 5 kí tự')
      .max(30, 'Mật khẩu không quá 30 kí tự')
      .required('Mật khẩu không để trống'),
    xacNhanMatKhau: Yup.string()
      .oneOf([Yup.ref('matKhau'), null], 'Mật khẩu không khớp')
      .required('Xác nhận mật khẩu không để trống'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không để trống'),
    soDt: Yup.string()
      .matches(/^[0][0-9]{9}$/g, 'số điện thoại không hợp lệ')
      .required('số điện thoại không để trống'),
  });

  const handleSubmit = async (values) => {
    const data = await signUpAction(values);
    if (data) {
      props.onClick();
      props.handleSignUpSuccessOn();
      setState({ signUpFail: false });
    } else {
      setState({ signUpFail: true });
    }
  };

  return (
    <Formik
      initialValues={{
        hoTen: '',
        taiKhoan: '',
        matKhau: '',
        xacNhanMatKhau: '',
        email: '',
        soDt: '',
        maLoaiNguoiDung: 'KhachHang',
        maNhom: 'GP11',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmit(values);
      }}>
      <Form className='formSignUp'>
        <Input placeholder='Họ Tên' name='hoTen' type='text' />
        <Input placeholder='Tài Khoản' name='taiKhoan' type='text' />
        <div className='passwordContain'>
          <Input placeholder='mật Khẩu' name='matKhau' type='password' />
          <Input
            placeholder='xác nhận mật khẩu'
            name='xacNhanMatKhau'
            type='password'
          />
        </div>
        <Input placeholder='Email' name='email' type='email' />
        <Input placeholder='Số điện thoại' name='soDt' type='text' />
        <div className={state.signUpFail ? 'showSignUpFail' : 'notShow'}>
          <p>Tài khoản hoặc email đã tồn tại</p>
        </div>
        <button type='submit' className='SignUpSubmit'>
          ĐĂNG KÝ
        </button>
      </Form>
    </Formik>
  );
}

export default SignUp;
