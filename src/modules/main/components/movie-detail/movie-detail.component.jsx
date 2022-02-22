import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetailAction } from '../../../../store/actions/movie.actions';
import PopUpTrailer from '../pop-up-trailer/pop-up-trailer.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './movie-detail.component.scss';

function MovieDetail() {
  const trailer = useSelector((state) => state.movie.movieDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(trailer);

  const newMovieDetail = { trailer };

  const [showTrailer, setshowTrailer] = useState({ isTrueOrNot: false });

  const handleTrailer = (value) => {
    setshowTrailer({ isTrueOrNot: value });
  };

  useEffect(() => {
    dispatch(getMovieDetailAction(id));
  }, [dispatch, id]);

  const [windowWidth, setwindowWidth] = useState(window.screen.availWidth);
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
              <h4>NỘI DUNG PHIM</h4>
              <p>{trailer.moTa}</p>
            </div>
          </div>
          <div className='showTimes'>
            <h3>LỊCH CHIẾU</h3>
          </div>
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
