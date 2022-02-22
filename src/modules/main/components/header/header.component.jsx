import React, { useState } from 'react';
import './header.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { NavLink } from 'react-router-dom';

function Header(props) {
  const [windowWidth, setwindowWidth] = useState(window.screen.availWidth);
  const [activeDropDown, setactiveDropDown] = useState({ isTrueOrNot: false });

  const handleDropDown = () => {
    setactiveDropDown({
      ...activeDropDown,
      isTrueOrNot: !activeDropDown.isTrueOrNot,
    });
    console.log(activeDropDown.isTrueOrNot);
  };

  const handleUpdateLogo = () => {
    setwindowWidth(window.innerWidth);
  };
  window.addEventListener('resize', handleUpdateLogo);

  return (
    <section>
      <div className='myNavbar container concainer-lg'>
        <div className='logoContain'>
          <a href='/'>
            <img
              src={
                windowWidth < 768
                  ? '/images/galaxy-logo-mobile.png'
                  : '/images/galaxy-logo.png'
              }
              alt='logo'
              className='navLogo'
            />
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
          <button className='navLogin' onClick={() => props.onClick()}>
            <FontAwesomeIcon icon={solid('user')} />
            Đăng nhập
          </button>
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
              <li>
                <NavLink className='navLink' to='/booking'>
                  MUA VÉ
                </NavLink>
              </li>
              <li>
                <NavLink className='navLink' to='/movie'>
                  PHIM
                </NavLink>
              </li>
              <li>
                <NavLink className='navLink' to='/ticket-price'>
                  RẠP/GIÁ VÉ
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
          <NavLink className='navLink3' to='/ticket-price'>
            RẠP/GIÁ VÉ
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Header;
