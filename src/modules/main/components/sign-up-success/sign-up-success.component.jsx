import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './sign-up-success.component.scss';

function SignUpSuccess(props) {
  console.log(props);
  return (
    <section>
      <div
        onClick={() => props.handleSignUpSuccessOff()}
        className={
          'signUpSuccessBackground ' +
          (props.alertSignUpSuccess ? 'isShowBgSuccess' : 'notShowBgSuccess')
        }></div>
      <div
        className={
          'signUpSuccess ' +
          (props.alertSignUpSuccess
            ? 'showSignUpSuccessTitle'
            : 'notShowSignUpSuccessTitle')
        }>
        <h3>ĐĂNG KÝ THÀNH CÔNG</h3>
        <button
          className='xMark'
          onClick={() => props.handleSignUpSuccessOff()}>
          <FontAwesomeIcon icon={solid('xmark')} className='xFont' />
        </button>
        <div>
          <FontAwesomeIcon icon={solid('check')} className='check' />
        </div>
      </div>
    </section>
  );
}

export default SignUpSuccess;
