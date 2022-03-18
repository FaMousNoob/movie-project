import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dateFormat from 'date-format';
import './create-theater.component.scss';
import Input from '../../../main/components/input-field/input..component';
import { createTheaterAction } from '../../../../store/actions/movie.actions';
function CreateTheater(props) {
  const [state, setState] = useState({ warningMes: '' });
  const validation = Yup.object({
    ngayChieuGioChieu: Yup.string().required('Ngày chiếu không hợp lệ'),
    giaVe: Yup.string()
      .matches(/\b\d{5}\b/g, 'Giá vé phải có 5 số')
      .required('giá vé không được để trống'),
  });

  const handleSubmit = async (values) => {
    const newNgay = dateFormat(
      'dd/MM/yyyy hh:mm:ss',
      new Date(values.ngayChieuGioChieu)
    );
    values.ngayChieuGioChieu = newNgay;
    await createTheaterAction(values);
    const successWarning = JSON.parse(
      localStorage.getItem('createTheaterSuccess')
    );
    const failWarning = JSON.parse(localStorage.getItem('createTheaterFail'));
    if (successWarning) {
      setState({ warningMes: 'Tạo lịch chiếu thành công' });
    } else if (failWarning) {
      setState({ warningMes: 'Tạo lịch chiếu thất bại' });
    } else {
      setState({ warningMes: '' });
    }
  };

  const handleRemoveLocalStorage = () => {
    localStorage.removeItem('createTheaterFail');
    localStorage.removeItem('createTheaterSuccess');
  };

  return (
    <section className='createTheater'>
      <div
        className={
          'createTheaterBg ' + (props.showCreateTheater ? '' : 'hiddenbg')
        }
        onClick={() => {
          props.handleShowCreateTheater();
          handleRemoveLocalStorage();
        }}></div>
      <div
        className={
          'createTheaterBox ' +
          (props.showCreateTheater ? 'showBox' : 'hiddenbg')
        }>
        <button
          onClick={() => {
            props.handleShowCreateTheater();
            handleRemoveLocalStorage();
          }}>
          <FontAwesomeIcon icon={solid('xMark')} className='xMark' />
        </button>
        <h2>TẠO LỊCH CHIẾU PHIM</h2>
        <Formik
          enableReinitialize
          initialValues={{
            maPhim: props.maPhim,
            ngayChieuGioChieu: '',
            maRap: 901,
            giaVe: 0,
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validation}>
          {(formik) => (
            <Form className='myForm'>
              <div>
                <label htmlFor='ngayChieu'>Ngày và giờ chiếu</label>
                <Input
                  name='ngayChieuGioChieu'
                  type='datetime-local'
                  id='ngayChieu'
                />
              </div>
              <div>
                <label htmlFor='giaVe'>Giá vé</label>
                <Input name='giaVe' type='number' id='giaVe' />
              </div>
              <p>{state.warningMes}</p>
              <button type='submit'>Tạo lịch chiếu</button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default CreateTheater;
