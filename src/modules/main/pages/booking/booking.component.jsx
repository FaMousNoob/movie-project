import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import dateFormat from 'date-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  getMovieDetailAction,
  getMovieListAction,
} from '../../../../store/actions/movie.actions';
import { useSelector } from 'react-redux';
import './booking.component.scss';
import { useNavigate } from 'react-router-dom';
import { showLoginSignUpAction } from '../../../../store/actions/login-sign-up.action';

function Booking() {
  const [movies, setmovies] = useState({
    movieTheaterList: [],
    maPhim: '',
    theater: '',
    dayShowTime: [],
  });
  const { movieList, movieDetail } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMovieListAction());
  }, [dispatch]);

  const handleState = (name, value) => {
    const previousMovie = movies.maPhim;
    const previousTheater = movies.theater;
    // check if the state value is change to prevent unnecessary re-render
    if (previousMovie !== value && previousTheater !== value) {
      setmovies({ ...movies, [name]: value });
      if (name === 'maPhim') {
        dispatch(getMovieDetailAction(value));
      }
    }
  };

  //render movieList
  const renderMovieList = () => {
    return movieList?.slice(0, 20).map((movie, index) => (
      <button
        className={
          'bookingBtn ' +
          (movie.maPhim === movies.maPhim ? 'activeMovie color' : '')
        }
        key={index}
        onClick={() => handleState('maPhim', movie.maPhim)}>
        <img src={movie.hinhAnh} alt='' />
        <p>{movie.tenPhim}</p>
      </button>
    ));
  };

  //render the second box
  const renderTheaterList = () => {
    if (movieDetail.lichChieu) {
      if (movies.maPhim === movieDetail.maPhim) {
        const listTheater = [];
        movieDetail.lichChieu?.forEach((theater) => {
          const index = listTheater.indexOf(theater.thongTinRap.tenCumRap);
          if (index === -1) {
            listTheater.push(theater.thongTinRap.tenCumRap);
          }
        });
        if (movies.movieTheaterList.toString() !== listTheater.toString()) {
          setmovies({ ...movies, movieTheaterList: listTheater });
        }
        return movies.movieTheaterList?.sort().map((theater, index) => (
          <button
            key={index}
            className={
              'bookingBtn ' +
              (movies.theater === theater ? 'color activeMovie' : '')
            }
            onClick={() => handleState('theater', theater)}>
            <p className='theatherName'>{theater}</p>
          </button>
        ));
      }

      return (
        <div className='containFalseMovie'>
          <p className='returnLoading'>
            {' '}
            <FontAwesomeIcon
              icon={solid('circle-notch')}
              className='loadingPickTheater'
            />
          </p>
        </div>
      );
    }

    if (movies.maPhim === '') {
      return <p className='returnFalse'>vui lòng chọn phim</p>;
    }
    if (movies.maPhim !== movieDetail.maPhim) {
      return (
        <div className='containFalseMovie'>
          <p className='returnLoading'>
            <FontAwesomeIcon
              icon={solid('circle-notch')}
              className='loadingPickTheater'
            />
          </p>
        </div>
      );
    }
  };

  // set new movies.dayShowTime
  if (movies.theater !== '') {
    const newDayTimeShow = [];
    movieDetail.lichChieu?.forEach((theater) => {
      if (theater.thongTinRap.tenCumRap === movies.theater) {
        const ngayChieu = dateFormat(
          'dd/MM/yyyy',
          new Date(theater.ngayChieuGioChieu)
        );
        const index = newDayTimeShow.indexOf(ngayChieu);
        if (index === -1) {
          newDayTimeShow.push(ngayChieu);
        }
      }
    });
    if (movies.dayShowTime.toString() !== newDayTimeShow.toString()) {
      setmovies({ ...movies, dayShowTime: newDayTimeShow });
    }
  }

  //check userexist to open login or go to booking ticket page
  const checkUserExist = (malichChieu) => {
    const userExist = JSON.parse(localStorage.getItem('userLogin'));
    if (userExist) {
      navigate(`/booking/${malichChieu}`);
    } else {
      dispatch(showLoginSignUpAction(true));
    }
  };

  //render the third box
  const renderShowTimes = () => {
    if (movies.dayShowTime.toString() !== '') {
      return movies.dayShowTime?.map((day, index) => (
        <div key={index} className='dayContain'>
          <p className='day'>ngày {day}</p>
          <div className='row'>
            <p className='col-4'>2D - Phụ Đề</p>
            <div className='col-8 btnTime'>
              {movieDetail.lichChieu?.map((time, index) => {
                const ngayChieu = dateFormat(
                  'dd/MM/yyyy',
                  new Date(time.ngayChieuGioChieu)
                );
                const gioChieu = dateFormat(
                  'hh:mm',
                  new Date(time.ngayChieuGioChieu)
                );
                if (
                  time.thongTinRap.tenCumRap === movies.theater &&
                  day === ngayChieu
                ) {
                  return (
                    <button
                      onClick={() => checkUserExist(time.maLichChieu)}
                      key={index}>
                      {gioChieu}
                    </button>
                  );
                }
                return '';
              })}
            </div>
          </div>
        </div>
      ));
    } else {
      return <p className='returnFalse'>vui lòng chọn rạp</p>;
    }
  };

  return (
    <section className='booking container'>
      {/* <BookingMovie /> */}
      <ul className='bookingMovie'>
        <li>
          <h3>CHỌN PHIM</h3>
          <div className='bookingBox box1'>{renderMovieList()}</div>
        </li>
        <li className='box2'>
          <h3>CHỌN RẠP</h3>
          <div className='bookingBox '>{renderTheaterList()}</div>
        </li>
        <li>
          <h3>CHỌN SUẤT</h3>
          <div className='bookingBox box3'>{renderShowTimes()}</div>
        </li>
      </ul>
    </section>
  );
}

export default Booking;
