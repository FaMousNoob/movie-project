import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './alert-pop-up.component.scss';
function AlertPopUp(props) {
  const [state, setState] = useState({});
  const checkFailAction = JSON.parse(localStorage.getItem('adminUserFailed'));

  const handleAlertPopUp = () => {
    localStorage.removeItem('adminUserFailed');
    localStorage.removeItem('adminUserCreated');
    localStorage.removeItem('searchFailed');
    localStorage.removeItem('createTheaterSuccess');
    localStorage.removeItem('createTheaterFailed');

    setState({ ...state });
  };
  return (
    <section className='alertMain'>
      <div
        onClick={handleAlertPopUp}
        className={'alertBg ' + (checkFailAction ? '' : 'bgNone')}></div>
      <div
        className={
          'alertContain ' +
          (checkFailAction ? 'alertContainShow' : 'alertContainNone')
        }>
        <h3>{props.alertInfo.title}</h3>
        <p>{props.alertInfo.info}</p>
        <button onClick={handleAlertPopUp}>
          <FontAwesomeIcon icon={solid('xmark')} className='xMark' />
        </button>
      </div>
    </section>
  );
}

export default AlertPopUp;
