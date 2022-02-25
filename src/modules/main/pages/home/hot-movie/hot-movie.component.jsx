import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './hot-movie.component.scss';

function HotMovieHome() {
  const movieList = useSelector((state) => state.movie.movieList);
  const navigate = useNavigate();
  // detect window width change
  const [windowWidth, setwindowWidth] = useState(window.screen.availWidth);
  const handleRenderSideBar = () => {
    setwindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleRenderSideBar);

  const handleRender6Movie = () => {
    const numOfMovies = windowWidth < 768 ? 4 : 8;
    return movieList?.slice(0, numOfMovies).map((movie, index) => (
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
      <div className='containXemThem'>
        <button onClick={() => navigate('/movie')}>
          XEM THÊM
          <FontAwesomeIcon
            icon={solid('arrow-right-long')}
            className='arrowRight'
          />
        </button>
      </div>
    </div>
  );
}

export default HotMovieHome;
