import React, { useEffect, useState } from 'react';
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
  const anArray = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    window.addEventListener('resize', handleRenderSideBar);
    return () => {
      window.removeEventListener('resize', handleRenderSideBar);
    };
  }, []);

  //render loading div before data exists
  const renderLoadingHotMovies = () => {
    const numOfMovies = windowWidth < 768 ? 4 : 8;
    return anArray.slice(0, numOfMovies).map((movies, index) => (
      <div className='hotMovieBox' key={index}>
        <div className='hotMoviePic skeleton' id='loadingHotMovies'></div>
      </div>
    ));
  };

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
      <div className='hotMovieWrapper'>
        {movieList.length !== 0
          ? handleRender6Movie()
          : renderLoadingHotMovies()}
      </div>

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
