import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './user-add.component.scss';
import Input from '../../../main/components/input-field/input..component';
import { createUserAction } from '../../../../store/actions/user.action';
import AlertPopUp from '../../component/alert-pop-up/alert-pop-up.component';

function UserAdd() {
  const alertInfo = {
    title: '',
    info: '',
  };
  const checkLocalStorage = JSON.parse(
    localStorage.getItem('adminUserCreated')
  );
  if (checkLocalStorage) {
    alertInfo.title = 'TẠO THÀNH CÔNG';
    alertInfo.info = 'Tài khoản đã được tạo thành c   ông.';
  } else {
    alertInfo.title = 'TẠO KHÔNG THÀNH CÔNG';
    alertInfo.info = 'Tài khoản  hoặc Email đã được sử dụng.';
  }

  const [state, setState] = useState({});
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
      .matches(/^(?:[1-9]|0[1-9]|10)$/, 'số điện thoại không hợp lệ')
      .required('số điện thoại không để trống'),
    maLoaiNguoiDung: Yup.string().min(2, 'Loại người dùng chưa được chọn'),
  });
  const handleSubmit = async (values) => {
    await createUserAction(values);
    setState({ state });
  };
  return (
    <section className='userAdd'>
      <h2>Thêm người dùng</h2>
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
        {(formik) => (
          <Form>
            <ul>
              <li>
                <label htmlFor=''>Họ Tên</label>
                <Input name='hoTen' type='text' />
              </li>
              <li>
                <label htmlFor=''>Tài khoản</label>
                <Input name='taiKhoan' type='text' />
              </li>
              <li>
                <label htmlFor=''>Email</label>
                <Input name='email' type='email' />
              </li>
              <li>
                <label htmlFor=''>Số điện thoại</label>
                <Input name='soDt' type='text' />
              </li>
              <li>
                <label htmlFor=''>Mật khẩu</label>
                <Input name='matKhau' type='password' />
              </li>
              <li>
                <label htmlFor=''>Xác nhận mật khẩu</label>
                <Input name='xacNhanMatKhau' type='password' />
              </li>
              <li>
                <label htmlFor=''>Loại người dùng</label>
                <Field
                  className='maLoaiNguoiDung'
                  component='select'
                  name='maLoaiNguoiDung'>
                  <option value='KhachHang'>Khách hàng</option>
                  <option value='QuanTri'>Quản trị</option>
                </Field>
              </li>
            </ul>
            <button className='createSubmit' type='submit'>
              Tạo tài khoản
            </button>
          </Form>
        )}
      </Formik>
      <AlertPopUp alertInfo={alertInfo} />
    </section>
  );
}

export default UserAdd;
