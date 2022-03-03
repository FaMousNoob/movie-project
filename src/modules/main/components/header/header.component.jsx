import React, { useState } from 'react';
import './header.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { NavLink } from 'react-router-dom';

function Header(props) {
  const [activeDropDown, setactiveDropDown] = useState({ isTrueOrNot: false });

  const handleDropDown = () => {
    setactiveDropDown({
      ...activeDropDown,
      isTrueOrNot: !activeDropDown.isTrueOrNot,
    });
    console.log(activeDropDown.isTrueOrNot);
  };

  const checkUser = JSON.parse(localStorage.getItem('userLogin'));

  const handleSignOut = () => {
    localStorage.removeItem('userLogin');
    window.location.reload(false);
  };

  const loginOrSignOutBtn = () => {
    if (checkUser) {
      return (
        <div className='dropdown '>
          <button
            className='signOutBtn btn btn-secondary dropdown-toggle'
            type='button'
            id='dropdownMenuButton1'
            data-bs-toggle='dropdown'
            aria-expanded='false'>
            <FontAwesomeIcon icon={solid('user')} className='userIcon' />
            user
          </button>
          <ul
            className='dropdown-menu dropDownUser'
            aria-labelledby='dropdownMenuButton1'>
            <li>Tài khoản</li>
            <li onClick={handleSignOut}>Thoát</li>
          </ul>
        </div>
      );
    } else {
      return (
        <button className='navLogin' onClick={() => props.onClick()}>
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
