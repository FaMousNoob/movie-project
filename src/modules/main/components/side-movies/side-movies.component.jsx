import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMovieListAction } from '../../../../store/actions/movie.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './side-movies.component.scss';

function SideMovies() {
  const { movieList } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMovieListAction());
  }, [dispatch]);
  const anArray = [1, 2, 3, 4, 5, 6];

  const renderMoviesLoading = () => {
    return anArray?.map((movie, index) => (
      <div key={index} className='moviesEach skeleton' id='loadingSideMovies'>
        <p></p>
      </div>
    ));
  };

  const renderMovies = () => {
    return movieList?.slice(0, 6).map((movie, index) => {
      const protocal = 'https';
      const splitImgUrl = movie?.hinhAnh.split('http');
      const httpsImg = protocal.concat(splitImgUrl[1]);

      return (
        <div key={index} className='moviesEach'>
          <Link to={`/movie-detail/${movie.maPhim}`}>
            <img src={httpsImg} alt='' />
          </Link>
          <p>{movie.tenPhim}</p>
        </div>
      );
    });
  };

  return (
    <section className=' sideMovies'>
      <h3>PHIM ĐANG CHIẾU</h3>
      <div className='sideMoviesContain'>
        {movieList.length !== 0 ? renderMovies() : renderMoviesLoading()}
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
    </section>
  );
}

export default SideMovies;
