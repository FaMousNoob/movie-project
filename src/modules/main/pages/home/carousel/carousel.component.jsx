import React, { useState } from 'react';
import './carousel.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import PopUpTrailer from '../../../components/pop-up-trailer/pop-up-trailer.component';
import { Link } from 'react-router-dom';

function CarouselHome() {
  const [showTrailer, setshowTrailer] = useState({ isTrueOrNot: false });
  const [currentTrailer, setcurrentTrailer] = useState({
    id: 0,
    tenPhim: '',
    img: '',
    trailer: '',
  });

  const handleTrailer = (value) => {
    setshowTrailer({ isTrueOrNot: value });
  };

  const handleCurrentTrailer = (trailer) => {
    setcurrentTrailer({ trailer });
  };

  const carouselData = [
    {
      id: 0,
      maPhim: 10311,
      tenPhim: 'chuyện Ma Gần Nhà',
      img: '/images/chuyen-ma-gan-nha.jpg',
      trailer: 'https://www.youtube.com/embed/iPPNEYMEO7M',
    },
    {
      id: 1,
      maPhim: 10312,
      tenPhim: 'Death Of The Nile',
      img: '/images/an-mang-tren-song-nile.jpg',
      trailer: 'https://www.youtube.com/embed/vjqcipRSARg',
    },

    {
      id: 2,
      maPhim: 10313,
      tenPhim: 'House Of Gucci',
      img: '/images/house-of-gucci.jpg',
      trailer: 'https://www.youtube.com/embed/y2AweBD1RSc',
    },
  ];

  const renderCarouselBtn = () =>
    carouselData.map((btn, index) => (
      <button
        key={index}
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide-to={btn.id}
        className={(btn.id === 0 ? 'active ' : '') + 'carouselSlide'}
      />
    ));

  const renderCarouselPic = () => {
    return carouselData.map((each, index) => (
      <div
        key={index}
        className={
          'carousel-item carouselImgBox ' + (each.id === 0 ? 'active' : '')
        }>
        <Link to={`/movie-detail/${each.maPhim}`}>
          <img src={each.img} className='d-block w-100' alt='trailer' />
        </Link>

        <button
          className='carouselBtn'
          onClick={() => {
            handleTrailer(true);
            handleCurrentTrailer(each);
          }}>
          <FontAwesomeIcon icon={solid('play')} className='playVideoCarousel' />
        </button>
      </div>
    ));
  };

  return (
    <div>
      <div
        id='carouselExampleIndicators'
        className='carousel slide carouselSlide'
        data-bs-ride='carousel'>
        <div className='carousel-indicators' id='carousel-indicators'>
          {renderCarouselBtn()}
        </div>
        <div className='carousel-inner position-relative'>
          {renderCarouselPic()}
        </div>
        <button
          className='carousel-control-prev carouselNextPreviousBtn'
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true' />
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next carouselNextPreviousBtn'
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true' />
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
      <PopUpTrailer
        onClick={() => handleTrailer(false)}
        showTrailer={showTrailer.isTrueOrNot}
        trailer={currentTrailer}
      />
    </div>
  );
}

export default CarouselHome;
