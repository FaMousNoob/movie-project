import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getMovieDetailAction,
  getMovieListAction,
} from '../../../../store/actions/movie.actions';
import PopUpTrailer from '../pop-up-trailer/pop-up-trailer.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './movie-detail.component.scss';
import ShowTimes from './showTimes/showTimes.component';

function MovieDetail() {
  const [windowWidth, setwindowWidth] = useState(window.screen.availWidth);

  const [showTrailer, setshowTrailer] = useState({ isTrueOrNot: false });
  const trailer = useSelector((state) => state.movie.movieDetail);
  const { movieList } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(trailer);

  // extend variable to sync data with other component to render popUpTrailer
  const newMovieDetail = { trailer };

  useEffect(() => {
    dispatch(getMovieDetailAction(id));
    dispatch(getMovieListAction());
  }, [dispatch, id]);

  const handleTrailer = (value) => {
    setshowTrailer({ isTrueOrNot: value });
  };

  //detect window size change
  const handleRenderSideBar = () => {
    setwindowWidth(window.innerWidth);
  };
  window.addEventListener('resize', handleRenderSideBar);

  return (
    <section className=' container movieDetailContain'>
      <div className='row'>
        <div className='col-md-8 movieDetailWrapper'>
          <div className='row'>
            <div className='col-lg-4 movieDetailPicContain'>
              <div className='btnPicBox'>
                {trailer?.maPhim === parseInt(id) ? (
                  <img src={trailer.hinhAnh} alt='' />
                ) : (
                  <div className='loadingMovie skeleton'></div>
                )}
                <button onClick={() => handleTrailer(true)}>
                  <FontAwesomeIcon icon={solid('play')} />
                </button>
              </div>
            </div>
            <div className='col-lg-8 movieInfo'>
              <h2>
                {trailer?.maPhim === parseInt(id) ? (
                  trailer.tenPhim
                ) : (
                  <div className='skeleton'></div>
                )}
              </h2>
              <div className='danhGia'>
                <FontAwesomeIcon icon={solid('star')} className='fontStar' />
                <p>
                  <span>{trailer.danhGia}</span>/{trailer.danhGia}
                </p>
              </div>

              <h4>NỘI DUNG PHIM</h4>
              <p className='noiDung'>
                {trailer?.maPhim === parseInt(id) ? (
                  trailer.moTa
                ) : (
                  <span>
                    <span className='skeleton'></span>
                    <span className='skeleton'></span>
                    <span className='skeleton'></span>
                    <span className='skeleton'></span>
                  </span>
                )}
              </p>
            </div>
          </div>
          {trailer?.maPhim === parseInt(id) ? <ShowTimes /> : ''}
        </div>
        {windowWidth >= 768 ? (
          trailer?.maPhim === parseInt(id) ? (
            <div className='col-md-4 sideMovies'>
              <h3>PHIM ĐANG CHIẾU</h3>
              <div className='sideMoviesContain'>
                {movieList?.slice(0, 6).map((movie, index) => (
                  <div key={index} className='moviesEach'>
                    <Link to={`/movie-detail/${movie.maPhim}`}>
                      <img src={movie.hinhAnh} alt='' />
                    </Link>
                    <p>{movie.tenPhim}</p>
                  </div>
                ))}
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
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
      <PopUpTrailer
        onClick={() => handleTrailer(false)}
        showTrailer={showTrailer.isTrueOrNot}
        trailer={newMovieDetail}
      />
    </section>
  );
}

export default MovieDetail;
