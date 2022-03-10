import React, { useEffect } from 'react';
import './movie.component.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovieListAction } from '../../../../store/actions/movie.actions';

function Movie() {
  const movieList = useSelector((state) => state.movie.movieList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction());
    return dispatch;
  }, [dispatch]);
  const anArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  const renderLoadingMovies = () =>
    anArray.map((movie, index) => (
      <div className='hotMovieBox' key={index}>
        <div className='hotMoviePic skeleton' id='loadingHotMovies'></div>
      </div>
    ));

  const handleRender6Movie = () =>
    movieList?.slice(0, 18).map((movie, index) => {
      const protocal = 'https';
      const splitImgUrl = movie.hinhAnh.split('http');
      const httpsImg = protocal.concat(splitImgUrl[1]);
      return (
        <div className='hotMovieBox' key={index}>
          <Link to={`/movie-detail/${movie.maPhim}`}>
            <div className='hotMoviePic'>
              <img src={httpsImg} alt='' />
              <button>MUA VÉ</button>
            </div>
          </Link>
          <div className='hotMovieName'>
            <p>{movie.tenPhim}</p>
          </div>
        </div>
      );
    });

  return (
    <div className='movies container'>
      <div className='hotMovieTitle'>
        <h3>PHIM ĐANG CHIẾU</h3>
      </div>
      <div className='hotMovieWrapper'>
        {movieList.length !== 0 ? handleRender6Movie() : renderLoadingMovies()}
      </div>
    </div>
  );
}

export default Movie;
