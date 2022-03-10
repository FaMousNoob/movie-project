import React, { useState } from 'react';
import './main.templates.scss';
import Header from '../components/header/header.component';
import LoginSignUp from '../components/login-and-signup/login-signup.component';
import Footer from '../components/footer/footer.component';
import SignUpSuccess from '../components/sign-up-success/sign-up-success.component';

function MainTemplate({ children }) {
  //decide signupSuccess show up or not
  const [alertSignUpSuccess, setalertSignUpSuccess] = useState({
    activeOrNot: false,
  });
  //change value to show singupsuccess or not
  const handleSignUpSuccess = (value) => {
    setalertSignUpSuccess({ activeOrNot: value });
  };

  return (
    <section>
      <Header />
      <LoginSignUp handleSignUpSuccessOn={() => handleSignUpSuccess(true)} />

      <SignUpSuccess
        alertSignUpSuccess={alertSignUpSuccess.activeOrNot}
        handleSignUpSuccessOff={() => handleSignUpSuccess(false)}
      />
      {children}
      <Footer />
    </section>
  );
}

export default MainTemplate;
