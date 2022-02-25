import React, { useEffect, useState } from 'react';
import './movie.component.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovieListAction } from '../../../../store/actions/movie.actions';

function Movie() {
  // const [windowWidth, setwindowWidth] = useState(window.screen.availWidth);
  const movieList = useSelector((state) => state.movie.movieList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction());
    return dispatch;
  }, [dispatch]);
  console.log(movieList);

  // const handleRenderSideBar = () => {
  //   setwindowWidth(window.innerWidth);
  // };

  // window.addEventListener('resize', handleRenderSideBar);

  const handleRender6Movie = () => {
    return movieList?.slice(0, 18).map((movie, index) => (
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
    <div className='movies container'>
      <div className='hotMovieTitle'>
        <h3>PHIM ĐANG CHIẾU</h3>
      </div>
      <div className='hotMovieWrapper'>{handleRender6Movie()}</div>
    </div>
  );
}

export default Movie;
