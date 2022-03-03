import React, { useState } from 'react';
import './main.templates.scss';
import Header from '../components/header/header.component';
import LoginSignUp from '../components/login-and-signup/login-signup.component';
import Footer from '../components/footer/footer.component';

function MainTemplate(props) {
  const { children } = props;
  console.log(props);
  const [loginSignUpState, setactiveLoginSignUpState] = useState({
    activeOrNot: false,
  });

  const [deactiveLoginSignUp, activeLoginSignUp] = [false, true];

  const handleLoginSignUp = (value) => {
    setactiveLoginSignUpState({ ...loginSignUpState, activeOrNot: value });
  };

  return (
    <section>
      <Header onClick={() => handleLoginSignUp(activeLoginSignUp)} />
      <LoginSignUp
        loginSignUpState={loginSignUpState.activeOrNot}
        onClick={() => handleLoginSignUp(deactiveLoginSignUp)}
      />
      {children}
      <Footer />
    </section>
  );
}

export default MainTemplate;
