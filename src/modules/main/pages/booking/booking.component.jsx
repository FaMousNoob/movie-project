import React, { useState } from 'react';
import './booking.component.scss';
import BookingMovie from './booking-movie/booking-movie.component';
import BookingTheather from './booking-theather/booking-theather.component';

function Booking() {
  const [movieOrTheather, setmovieOrTheather] = useState({
    isTrueOrNot: false,
  });

  const renderMovieOrTheater = () => {
    if (movieOrTheather.isTrueOrNot) {
      return <BookingTheather />;
    }
    return <BookingMovie />;
  };

  const handleMovieOrTheather = (value) => {
    setmovieOrTheather({ isTrueOrNot: value });
  };

  return (
    <section className='booking container'>
      <ul className='bookingTitle'>
        <li>
          <h3
            className={movieOrTheather.isTrueOrNot ? '' : 'active'}
            onClick={() => handleMovieOrTheather(false)}>
            THEO PHIM
          </h3>
        </li>
        <li>
          <h3
            className={movieOrTheather.isTrueOrNot ? 'active' : ''}
            onClick={() => handleMovieOrTheather(true)}>
            THEO RẠP
          </h3>
        </li>
      </ul>
      <div className='bookingData'>{renderMovieOrTheater()}</div>
    </section>
  );
}

export default Booking;
