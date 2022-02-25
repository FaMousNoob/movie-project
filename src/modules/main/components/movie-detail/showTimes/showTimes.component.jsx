import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dateFormat from 'date-format';
import './showTimes.component.scss';

function ShowTimes() {
  const [showtimeForm, setshowtimeForm] = useState({
    loaiRap: '',
    chooseCinema: [],
    loaiVungRap: '',
    chooseCinemaPlace: [],
    ngayChieu: '',
    chooseNgayChieu: [],
  });
  const { lichChieu } = useSelector((state) => state.movie.movieDetail);

  //UPDATE LOAIRAP AND CHOOSECINEMA VARIABLES
  const listLoaiRap = [];
  lichChieu?.forEach((movie) => {
    const index = listLoaiRap.indexOf(movie.thongTinRap.maHeThongRap);
    if (index === -1) {
      listLoaiRap.push(movie.thongTinRap.maHeThongRap);
    }
  });
  if (showtimeForm.chooseCinema.toString() !== listLoaiRap.toString()) {
    setshowtimeForm({
      ...showtimeForm,
      chooseCinema: listLoaiRap,
      loaiRap: listLoaiRap[0],
    });
  }

  // DETECT CHANGES FROM SELECT OPTION
  const handleChange = (e) => {
    const { value, name } = e.target;
    setshowtimeForm({
      ...showtimeForm,
      [name]: value,
    });
  };

  //UPDATE CHOOSECINEMAPLACE FROM THE VARIABLE OF LOAIRAP
  if (showtimeForm.loaiRap !== '') {
    const listVungRap = [];
    lichChieu?.forEach((movie) => {
      if (showtimeForm.loaiRap === movie.thongTinRap.maHeThongRap) {
        listVungRap.push(movie.thongTinRap);
      }
    });

    const rapKhacNhau = [];
    listVungRap.forEach((cinema) => {
      const index = rapKhacNhau.indexOf(cinema.tenCumRap);
      if (index === -1) {
        rapKhacNhau.push(cinema.tenCumRap);
      }
    });
    if (showtimeForm.chooseCinemaPlace.toString() !== rapKhacNhau.toString()) {
      setshowtimeForm({
        ...showtimeForm,
        chooseCinemaPlace: rapKhacNhau,
        loaiVungRap: rapKhacNhau[0],
      });
    }
  }

  if (showtimeForm.loaiVungRap !== '') {
    const ngayChieu = [];
    lichChieu?.forEach((cinema) => {
      if (
        cinema.thongTinRap.maHeThongRap === showtimeForm.loaiRap &&
        cinema.thongTinRap.tenCumRap === showtimeForm.loaiVungRap
      ) {
        ngayChieu.push(cinema.ngayChieuGioChieu);
      }
    });
    const luuNgayChieu = [];
    ngayChieu.forEach((ngay) => {
      const newNgay = dateFormat('dd/MM/yyyy', new Date(ngay));
      const index = luuNgayChieu.indexOf(newNgay);
      if (index === -1) {
        luuNgayChieu.push(newNgay);
      }
    });

    if (showtimeForm.chooseNgayChieu.toString() !== luuNgayChieu.toString()) {
      setshowtimeForm({
        ...showtimeForm,
        chooseNgayChieu: luuNgayChieu,
        ngayChieu: luuNgayChieu[0],
      });
    }
  }

  const renderOption = (value) => {
    return value.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };

  const rendershowtime = () => {
    return lichChieu?.map((cinema, index) => {
      const ngayChieu = dateFormat(
        'dd/MM/yyyy',
        new Date(cinema.ngayChieuGioChieu)
      );
      const gioChieu = dateFormat('hh:mm', new Date(cinema.ngayChieuGioChieu));

      if (
        cinema.thongTinRap.maHeThongRap === showtimeForm.loaiRap &&
        cinema.thongTinRap.tenCumRap === showtimeForm.loaiVungRap &&
        ngayChieu === showtimeForm.ngayChieu
      ) {
        return <button key={index}>{gioChieu}</button>;
      }
      return false;
    });
  };

  return (
    <div className='showTimes'>
      <h3>LỊCH CHIẾU</h3>
      <div className='selectContain'>
        <select
          name='loaiRap'
          onChange={handleChange}
          className='form-select cinemaType'
          aria-label='Default select example'>
          {renderOption(showtimeForm.chooseCinema)}
        </select>
        <select
          name='loaiVungRap'
          onChange={handleChange}
          className='form-select middleSelect'
          aria-label='Default select example'>
          {renderOption(showtimeForm.chooseCinemaPlace)}
        </select>
        <select
          name='ngayChieu'
          onChange={handleChange}
          className='form-select'
          aria-label='Default select example'>
          {renderOption(showtimeForm.chooseNgayChieu)}
        </select>
      </div>
      <div className='cinema'>
        <h4>{showtimeForm.loaiVungRap}</h4>
        <div className=' cinemaBook'>
          <div className='row bookBox'>
            <p className='col-3'>2D - PHỤ ĐỀ</p>
            <div className='col-9'>{rendershowtime()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTimes;
