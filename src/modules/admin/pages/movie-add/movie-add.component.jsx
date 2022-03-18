import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Input from '../../../main/components/input-field/input..component';
import AlertPopUp from '../../component/alert-pop-up/alert-pop-up.component';
import './movie-add.component.scss';
import dateFormat from 'date-format';
import { uploadMovieAction } from '../../../../store/actions/movie.actions';

function MovieAdd() {
  const [state, setState] = useState({});
  const alertInfo = {
    title: '',
    info: '',
  };
  if (JSON.parse(localStorage.getItem('adminUserCreated'))) {
    alertInfo.title = 'TẠO PHIM THÀNH CÔNG';
  } else {
    alertInfo.title = 'LỖI PHIM';
    alertInfo.info = 'Tên phim đã tồn tại';
  }

  const validation = Yup.object({
    tenPhim: Yup.string().required('Tên phim không để trống'),
    trailer: Yup.string().required('Trailer không để trống'),
    hinhAnh: Yup.string().required('Hình ảnh không để trống'),
    ngayKhoiChieu: Yup.string().required('Ngày Chiếu không hợp lệ'),
    moTa: Yup.string().required('Mô tả không để trống'),
  });

  const handleSubmit = async (values) => {
    const newNgay = dateFormat('dd/MM/yyyy', new Date(values.ngayKhoiChieu));
    const movieFormData = new FormData();
    movieFormData.append('maPhim', values.maPhim);
    movieFormData.append('tenPhim', values.tenPhim);
    movieFormData.append('biDanh', values.tenPhim);
    movieFormData.append('trailer', values.trailer);
    movieFormData.append('hinhAnh', values.hinhAnh);
    movieFormData.append('moTa', values.moTa);
    movieFormData.append('maNhom', values.maNhom);
    movieFormData.append('ngayKhoiChieu', newNgay);
    movieFormData.append('danhGia', values.danhGia);

    await uploadMovieAction(movieFormData);
    setState({ state });
  };

  return (
    <section className='movieAdd'>
      <h2>THÊM PHIM</h2>
      <Formik
        initialValues={{
          maPhim: 0,
          tenPhim: '',
          biDanh: '',
          trailer: '',
          hinhAnh: '',
          moTa: '',
          maNhom: 'GP11',
          ngayKhoiChieu: '',
          danhGia: 0,
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {(formik) => (
          <Form>
            <ul>
              <li>
                <label htmlFor=''>Tên phim</label>
                <Input name='tenPhim' type='text' />
              </li>
              <li>
                <label htmlFor=''>trailer</label>
                <Input name='trailer' type='text' />
              </li>
              <li>
                <label htmlFor=''>Đánh giá</label>
                <Input name='danhGia' type='number' />
              </li>
              <li>
                <label htmlFor=''>Ngày khởi chiếu</label>
                <Input name='ngayKhoiChieu' type='date' />
              </li>
              <li>
                <label htmlFor=''>Hình ảnh</label>
                <input
                  name='hinhAnh'
                  type='file'
                  onChange={(event) => {
                    formik.setFieldValue(
                      'hinhAnh',
                      event.currentTarget.files[0]
                    );
                  }}
                />
                <p>file không được vượt quá 1mb</p>
              </li>
              <li>
                <label htmlFor=''>Nội dung</label>
                <Field
                  className='maLoaiNguoiDung'
                  component='textarea'
                  name='moTa'
                />
              </li>
            </ul>
            <button className='createSubmit' type='submit'>
              Tạo phim
            </button>
          </Form>
        )}
      </Formik>
      <AlertPopUp alertInfo={alertInfo} />
    </section>
  );
}

export default MovieAdd;
