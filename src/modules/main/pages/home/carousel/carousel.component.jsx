import React, { useState } from 'react';
import './carousel.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function CarouselHome() {
  const [popUptraler, setpopUptraler] = useState({ isTrueOrNot: false });
  const [currentTrailer, setcurrentTrailer] = useState({
    title: '',
    urlYoutube: '',
  });
  const carouselData = [
    {
      id: 0,
      title: 'chuyện Ma Gần Nhà',
      img: './img/chuyen-ma-gan-nha.jpg',
      urlYoutube: 'https://www.youtube.com/embed/iPPNEYMEO7M',
    },
    {
      id: 1,
      title: 'Death Of The Nile',
      img: './img/an-mang-tren-song-nile.jpg',
      urlYoutube: 'https://www.youtube.com/embed/vjqcipRSARg',
    },
    {
      id: 2,
      title: 'Moonfall',
      img: './img/moon-fall.jpg',
      urlYoutube: 'https://www.youtube.com/embed/grjSTCfYLG8',
    },
    {
      id: 3,
      title: 'House Of Gucci',
      img: './img/house-of-gucci.jpg',
      urlYoutube: 'https://www.youtube.com/embed/y2AweBD1RSc',
    },
    {
      id: 4,
      title: 'Spider-Man No Way Home',
      img: './img/spiderman-nwh.jpg',
      urlYoutube: 'https://www.youtube.com/embed/JfVOs4VSpmA',
    },
  ];

  const handleTrailer = (value) => {
    setpopUptraler({ ...popUptraler, isTrueOrNot: value });
  };

  const handleCurrentTrailer = (title, urlYoutube) => {
    setcurrentTrailer({
      ...currentTrailer,
      title: title,
      urlYoutube: urlYoutube,
    });
  };

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
          'carousel-item carouselImgContain ' + (each.id === 0 ? 'active' : '')
        }>
        <img src={each.img} className='d-block w-100' alt='trailer' />
        <button
          className='carouselBtn'
          onClick={() => {
            handleTrailer(true);
            handleCurrentTrailer(each.title, each.urlYoutube);
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
        <div className='carousel-inner'>{renderCarouselPic()}</div>
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
      <div
        onClick={() => {
          handleTrailer(false);
          handleCurrentTrailer('', '');
        }}
        className={
          'blankBackground ' +
          (popUptraler.isTrueOrNot ? 'onTrailer' : 'offTrailer')
        }></div>
      <div
        className={
          'ytbLink ' + (popUptraler.isTrueOrNot ? 'onTrailer' : 'offTrailer')
        }>
        <div className='ytbTitle'>
          <p>{currentTrailer.title}</p>
          <button
            onClick={() => {
              handleTrailer(false);
              handleCurrentTrailer('', '');
            }}>
            <FontAwesomeIcon icon={solid('xmark')} className='ytbXmark' />
          </button>
        </div>
        <div className='ytbLinkWrapper'>
          <iframe
            src={currentTrailer.urlYoutube}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}

export default CarouselHome;
