import React from 'react';
import './pop-up-trailer.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './pop-up-trailer.component.scss';

function PopUpTrailer(props) {
  const { trailer, showTrailer } = props;
  return (
    <div>
      <div
        onClick={() => {
          props.onClick();
        }}
        className={
          'blankBackground ' + (showTrailer ? 'onTrailer' : 'offTrailer')
        }></div>
      <div className={'ytbLink ' + (showTrailer ? 'onTrailer' : 'offTrailer')}>
        <div className='ytbTitle'>
          {trailer ? (
            <p>{showTrailer ? trailer.trailer.tenPhim : ' '}</p>
          ) : (
            <p className='skeleton'></p>
          )}

          <button
            onClick={() => {
              props.onClick();
            }}>
            <FontAwesomeIcon icon={solid('xmark')} className='ytbXmark' />
          </button>
        </div>
        <div className='ytbLinkWrapper'>
          <iframe
            className='skeleton'
            src={showTrailer ? trailer.trailer.trailer : ''}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}

export default PopUpTrailer;
