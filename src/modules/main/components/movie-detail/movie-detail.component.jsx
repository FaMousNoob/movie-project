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

function MovieDetail() {
  const [windowWidth, setwindowWidth] = useState(window.screen.availWidth);

  const [showTrailer, setshowTrailer] = useState({ isTrueOrNot: false });
  const trailer = useSelector((state) => state.movie.movieDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMovieDetailAction(id));
  }, [dispatch, id]);

  const newMovieDetail = { trailer };

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
                <img src={trailer.hinhAnh} alt='' className='skeleton' />
                <button onClick={() => handleTrailer(true)}>
                  <FontAwesomeIcon icon={solid('play')} />
                </button>
              </div>
            </div>
            <div className='col-lg-8 movieInfo'>
              <h2>{trailer.tenPhim}</h2>
              <div className='danhGia'>
                <FontAwesomeIcon icon={solid('star')} className='fontStar' />
                <p>
                  <span>{trailer.danhGia}</span>/{trailer.danhGia}
                </p>
              </div>

              <h4>NỘI DUNG PHIM</h4>
              <p>{trailer.moTa}</p>
            </div>
          </div>
          <ShowTimes />
        </div>
        {windowWidth >= 768 ? <div className='col-md-4'>sidebar</div> : ''}
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

/* <button onClick={() => handleTrailer(true)}>open pop up trailer</button>*/
