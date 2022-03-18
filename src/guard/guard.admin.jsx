import React from 'react';
import { Navigate } from 'react-router-dom';

const GuardAdmin = ({ children }) => {
  const userExist = JSON.parse(localStorage.getItem('userLogin'));
  if (userExist) {
    const adminUser = userExist.maLoaiNguoiDung;
    if (adminUser === 'QuanTri') {
      return children;
    }
    return <Navigate to='/' />;
  } else {
    return <Navigate to='/' />;
  }
};

export default GuardAdmin;
