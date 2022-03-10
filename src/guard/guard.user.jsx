// import React from 'react';
// import User from '../modules/main/pages/user/user.component';

import { Navigate } from 'react-router-dom';

function GuardUser({ children }) {
  const userExist = JSON.parse(localStorage.getItem('userLogin'));
  if (userExist) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
}

export default GuardUser;
