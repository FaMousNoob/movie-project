import React, { useState } from 'react';
import './main.templates.scss';
import Header from '../components/header/header.component';
import LoginSignUp from '../components/login-and-signup/login-signup.component';

function MainTemplate({ children }) {
  const [loginSignUpState, setactiveLoginSignUpState] = useState({
    activeOrNot: false,
  });
  const [deactiveLoginSignUp, activeLoginSignUp] = [false, true];

  const handleLoginSignUp = (value) => {
    setactiveLoginSignUpState({ ...loginSignUpState, activeOrNot: value });
  };

  return (
    <div>
      <Header onClick={() => handleLoginSignUp(activeLoginSignUp)} />
      <LoginSignUp
        loginSignUpState={loginSignUpState.activeOrNot}
        onClick={() => handleLoginSignUp(deactiveLoginSignUp)}
      />
      {children}
    </div>
  );
}

export default MainTemplate;
