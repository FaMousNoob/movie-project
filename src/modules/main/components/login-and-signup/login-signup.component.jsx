import React, { useState } from 'react';
import './login-signup.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Login from '../../pages/login/login.component';
import SignUp from '../../pages/sign-up/sign-up.component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showLoginSignUpAction } from '../../../../store/actions/login-sign-up.action';
function LoginSignUp(props) {
  //props from mainTemplate
  const dispatch = useDispatch();
  const showComponentOrNot = useSelector(
    (state) => state.activeLoginSignUp.activeLoginSignUp
  );
  const [isLoginOrSignUp, setisLoginOrNot] = useState({ loginOrSignUp: true });

  const handleLoginOrSignUp = (value) =>
    setisLoginOrNot({
      ...isLoginOrSignUp,
      loginOrSignUp: value,
    });

  return (
    <section>
      <div
        onClick={() => dispatch(showLoginSignUpAction(false))}
        className={
          'loginContain ' +
          (showComponentOrNot ? 'isShowTitleLogin' : 'NotShowTitleLogin')
        }></div>
      <div
        className={
          'loginTitle ' +
          (showComponentOrNot ? 'showLoginTitle' : 'notShowLoginTitle')
        }>
        <div className='loginBtns'>
          <button
            className={
              'loginSignUpBtn ' +
              (isLoginOrSignUp.loginOrSignUp ? 'isActive' : '')
            }
            onClick={() => {
              handleLoginOrSignUp(true);
            }}>
            ĐĂNG NHẬP
          </button>
          <span>/</span>
          <button
            className={
              'loginSignUpBtn ' +
              (isLoginOrSignUp.loginOrSignUp ? '' : 'isActive')
            }
            onClick={() => handleLoginOrSignUp(false)}>
            ĐĂNG KÝ
          </button>
        </div>

        <button
          className='loginX'
          onClick={() => dispatch(showLoginSignUpAction(false))}>
          <FontAwesomeIcon icon={solid('xmark')} className='xFont' />
        </button>
        {isLoginOrSignUp.loginOrSignUp ? (
          <Login />
        ) : (
          <SignUp
            //this onClick is to deactive login-signup component
            onClick={() => dispatch(showLoginSignUpAction(false))}
            //this onClick is to active SignUpSuccess component
            handleSignUpSuccessOn={() => props.handleSignUpSuccessOn()}
          />
        )}
      </div>
    </section>
  );
}

export default LoginSignUp;
