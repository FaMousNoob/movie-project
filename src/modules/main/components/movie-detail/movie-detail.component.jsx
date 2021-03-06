import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetailAction } from '../../../../store/actions/movie.actions';
import PopUpTrailer from '../pop-up-trailer/pop-up-trailer.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './movie-detail.component.scss';
import ShowTimes from './showTimes/showTimes.component';
import SideMovies from '../side-movies/side-movies.component';

function MovieDetail() {
  const [showTrailer, setshowTrailer] = useState({ isTrueOrNot: false });
  const trailer = useSelector((state) => state.movie.movieDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  // extend variable to sync data with other component to render popUpTrailer
  const newMovieDetail = { trailer };

  useEffect(() => {
    dispatch(getMovieDetailAction(id));
  }, [dispatch, id]);

  const handleTrailer = (value) => {
    setshowTrailer({ isTrueOrNot: value });
  };

  const returnHttpsImg = (trailer) => {
    const protocal = 'https';
    if (trailer.lichChieu) {
      const splitImgUrl = trailer?.hinhAnh.split('http');
      return protocal.concat(splitImgUrl[1]);
    }
    return '';
  };

  return (
    <section className=' container movieDetailContain'>
      <div className='row'>
        <div className='col-md-8 movieDetailWrapper'>
          <div className='row'>
            <div className='col-lg-4 movieDetailPicContain'>
              <div className='btnPicBox'>
                {trailer?.maPhim === parseInt(id) ? (
                  <img src={returnHttpsImg(trailer)} alt='' />
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
                  <span>{trailer.danhGia}</span>/10
                </p>
              </div>

              <h4>N???I DUNG PHIM</h4>
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
        <div className='showSideMovies col-4'>
          <SideMovies />
        </div>
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
