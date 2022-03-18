import React, { useState } from 'react';
import './header.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoginSignUpAction } from '../../../../store/actions/login-sign-up.action';

function Header() {
  //drop down menu in phone screen
  const [activeDropDown, setactiveDropDown] = useState({ isTrueOrNot: false });
  const dispatch = useDispatch();
  const handleDropDown = () => {
    setactiveDropDown({
      ...activeDropDown,
      isTrueOrNot: !activeDropDown.isTrueOrNot,
    });
  };

  //logout function
  const handleSignOut = () => {
    localStorage.removeItem('userLogin');
    window.location.reload(false);
  };

  const checkUser = JSON.parse(localStorage.getItem('userLogin'));
  const handleAdminBtn = () => {
    if (checkUser) {
      if (checkUser.maLoaiNguoiDung === 'QuanTri') {
        return (
          <li>
            <NavLink className='user' to='/admin/user-management'>
              Admin
            </NavLink>
          </li>
        );
      }
    }
  };

  //if user exist, show logout btn, else show login btn
  //render login or sign up btn
  const loginOrSignOutBtn = () => {
    if (checkUser) {
      const splitName = checkUser.hoTen.split(' ');
      const lastName = splitName.pop();
      return (
        <div className='dropdown dropDownHead'>
          <button
            className='signOutBtn btn btn-secondary dropdown-toggle'
            type='button'
            id='dropdownMenuButton1'
            data-bs-toggle='dropdown'
            aria-expanded='false'>
            <FontAwesomeIcon icon={solid('user')} className='userIcon' />
            <span>{lastName}</span>
          </button>
          <ul
            className='dropdown-menu dropDownUser'
            aria-labelledby='dropdownMenuButton1'>
            {handleAdminBtn()}
            <li>
              <NavLink className='user' to='/user'>
                Tài khoản
              </NavLink>
            </li>
            <li>
              <button className='user' onClick={handleSignOut}>
                Thoát
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <button
          className='navLogin'
          onClick={() => {
            dispatch(showLoginSignUpAction(true));
          }}>
          <FontAwesomeIcon icon={solid('user')} />
          Đăng nhập
        </button>
      );
    }
  };

  return (
    <section className='headerContain'>
      <div className='myNavbar container concainer-lg'>
        <div className='logoContain'>
          <a href='/'>
            <img
              src='/images/galaxy-logo-mobile.png'
              alt=''
              className='navLogoMobile'
            />
            <img src='/images/galaxy-logo.png' alt='' className='navLogo' />
          </a>
        </div>
        <div className='mainSearchMovie'>
          <FontAwesomeIcon
            icon={solid('magnifying-glass')}
            className='magnifying'
          />
          <input type='text' placeholder='Tìm tên phim' />
        </div>
        <div className='navbarRight'>
          {loginOrSignOutBtn()}
          <div
            className={
              'dropDownMenu ' +
              (activeDropDown.isTrueOrNot ? 'activeDropDown' : '')
            }>
            <button onClick={handleDropDown}>
              {activeDropDown.isTrueOrNot ? (
                <FontAwesomeIcon
                  icon={solid('xmark')}
                  className='NavBtn xMark'
                />
              ) : (
                <FontAwesomeIcon icon={solid('bars')} className='NavBtn' />
              )}
            </button>
            <ul
              className={
                activeDropDown.isTrueOrNot ? 'activeUlDrop' : 'deactiveUlDrop'
              }>
              <li>
                <div className='searchMovieInput'>
                  <input type='text' placeholder='Tìm tên phim' />
                  <FontAwesomeIcon
                    icon={solid('magnifying-glass')}
                    className='magnifying'
                  />
                </div>
              </li>
              <li onClick={handleDropDown}>
                <NavLink className='navLink' to='/booking'>
                  MUA VÉ
                </NavLink>
              </li>
              <li onClick={handleDropDown}>
                <NavLink className='navLink' to='/movie'>
                  PHIM
                </NavLink>
              </li>
              <li onClick={handleDropDown}>
                <NavLink className='navLink' to='/khuyen-mai'>
                  KHUYẾN MÃI
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className='navLinkWindowScreen'>
        <li>
          <NavLink className='navLink1' to='/booking'>
            MUA VÉ
          </NavLink>
        </li>
        <li>
          <NavLink className='navLink2' to='/movie'>
            PHIM
          </NavLink>
        </li>
        <li>
          <NavLink className='navLink3' to='/khuyen-mai'>
            KHUYẾN MÃI
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Header;
