import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserInfoAction,
  updateUserInfoAction,
} from '../../../../store/actions/user.action';
import SideMovies from '../../components/side-movies/side-movies.component';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './user.component.scss';
import Input from '../../components/input-field/input..component';
import dateFormat from 'date-format';

function User() {
  const [initialValues, setinitialValues] = useState({
    email: '',
    hoTen: '',
    matKhau: '',
    soDT: '',
  });
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //dispatch userInfo
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLogin'));
    dispatch(getUserInfoAction(user));
  }, [dispatch]);

  // set initialValue to userInfo selector
  if (JSON.stringify(initialValues) !== JSON.stringify(userInfo)) {
    setinitialValues(userInfo);
  }

  const validate = Yup.object({
    hoTen: Yup.string()
      .min(5, 'Họ Tên không ít hơn 5 kí tự')
      .max(30, 'Họ Tên không quá 30 kí tự')
      .required('Họ Tên không để trống'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không để trống'),
    soDT: Yup.string()
      .matches(/^\d{10}$/gm, 'số điện thoại không hợp lệ')
      .required('số điện thoại không để trống'),
    matKhau: Yup.string()
      .min(5, 'Mật khẩu không ít hơn 5 kí tự')
      .max(30, 'Mật khẩu không quá 30 kí tự')
      .required('Mật khẩu không để trống'),
  });

  const renderOrderedMovieList = () =>
    userInfo.thongTinDatVe?.map((info, index) => {
      const ngayDat = dateFormat('dd/MM/yyy', new Date(info.ngayDat));
      const chairs = [];
      info.danhSachGhe.forEach((chair) => chairs.push(chair.tenGhe));
      const chairList = chairs.join(', ');
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{info.maVe}</td>
          <td>{info.danhSachGhe[0].tenHeThongRap}</td>
          <td>{info.tenPhim}</td>
          <td>{chairList}</td>
          <td>{ngayDat}</td>
        </tr>
      );
    });

  const handleSubmit = (values) => {
    dispatch(updateUserInfoAction(values));
    window.location.reload(false);
  };
  return (
    <section className='container '>
      <div className='row'>
        <div className='userInfo col-md-8'>
          <div>
            <h3>THÔNG TIN CÁ NHÂN</h3>
            <Formik
              validationSchema={validate}
              enableReinitialize
              onSubmit={(values) => handleSubmit(values)}
              initialValues={initialValues}>
              <Form>
                <ul>
                  <li>
                    <label htmlFor='hoTen'>Họ & Tên</label>
                    <Input
                      placeholder='Họ & Tên'
                      name='hoTen'
                      type='text'
                      id='hoTen'
                    />
                  </li>

                  <li>
                    <label htmlFor='email'>Email</label>
                    <Input
                      placeholder='Email'
                      name='email'
                      type='email'
                      id='email'
                    />
                  </li>

                  <li>
                    <label htmlFor='soDT'>Số điện thoại</label>
                    <Input
                      placeholder='Số điện thoại'
                      name='soDT'
                      type='text'
                      id='soDT'
                    />
                  </li>

                  <li>
                    <label htmlFor='matKhau'>Mật khẩu</label>
                    <Input
                      placeholder='Mật khẩu'
                      name='matKhau'
                      type='password'
                      id='matKhau'
                    />
                  </li>
                </ul>
                <button type='submit'>Cập nhật</button>
              </Form>
            </Formik>
          </div>

          <div>
            <h3 className='userMovies'>PHIM ĐÃ ĐẶT</h3>
            <div className='orderedMovieList'>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã vé</th>
                    <th>Rạp</th>
                    <th>Phim</th>
                    <th>Số ghế</th>
                    <th>Ngày đặt</th>
                  </tr>
                </thead>
                <tbody>{renderOrderedMovieList()}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='sideMovie col-md-4'>
          <SideMovies />
        </div>
      </div>
    </section>
  );
}

export default User;
