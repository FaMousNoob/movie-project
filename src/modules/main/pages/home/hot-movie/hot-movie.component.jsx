import React from 'react';
import './hot-movie.component.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HotMovieHome() {
  const movieList = useSelector((state) => state.movie.movieList);
  console.log(movieList);

  const handleRender6Movie = () => {
    return movieList?.slice(0, 6).map((movie, index) => (
      <div className='hotMovieBox' key={index}>
        <Link to={`/movie-detail/${movie.maPhim}`}>
          <div className='hotMoviePic'>
            <img src={movie.hinhAnh} alt='' />

            <button>MUA VÉ</button>
          </div>
        </Link>

        <div className='hotMovieName'>
          <p>{movie.tenPhim}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className='container hotMovieContain'>
      <div className='hotMovieTitle'>
        <h3>PHIM ĐANG CHIẾU</h3>
      </div>
      <div className='hotMovieWrapper'>{handleRender6Movie()}</div>
    </div>
  );
}

export default HotMovieHome;
