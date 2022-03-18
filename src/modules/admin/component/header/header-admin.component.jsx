import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './header-admin.component.scss';
import { NavLink } from 'react-router-dom';

function HeaderAdmin() {
  const [displaySideBar, setdisplaySideBar] = useState({
    isTrueOrNot: false,
  });
  const user = JSON.parse(localStorage.getItem('userLogin'));
  const splitName = user.hoTen.split(' ');
  const lastName = splitName.pop();

  const navBtnData = [
    {
      to: '/admin/user-management',
      title: 'Quản lí tài Khoản',
    },
    {
      to: '/admin/user-add',
      title: 'Tạo tài khoản',
    },
    {
      to: '/admin/movie-management',
      title: 'Quản lí phim',
    },
    {
      to: '/admin/movie-add',
      title: 'Tạo phim',
    },
  ];

  const renderNavBtn = () =>
    navBtnData.map((btn, index) => (
      <li key={index}>
        <NavLink onClick={handleSideBar} className='adminNavLink' to={btn.to}>
          {btn.title}
        </NavLink>
      </li>
    ));

  const handleSideBar = () => {
    setdisplaySideBar({ isTrueOrNot: !displaySideBar.isTrueOrNot });
  };

  //logout function
  const handleSignOut = () => {
    localStorage.removeItem('userLogin');
    window.location.reload(false);
  };

  return (
    <section className='headerAdmin'>
      <div className='container headerAdmin2'>
        <button
          className={
            'navBtn ' + (displaySideBar.isTrueOrNot ? 'rotateNavBtn' : '')
          }
          onClick={handleSideBar}>
          <FontAwesomeIcon icon={solid('bars')} />
        </button>
        <div className='userAdmin'>
          <p>Chào Admin: </p>
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle dropDownHeader'
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              {lastName}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li>
                <NavLink className='btn' to='/'>
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <button className='btn' onClick={handleSignOut}>
                  Thoát
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={'navBarSideBox '}>
        <div
          className={
            'navBarSide ' +
            (displaySideBar.isTrueOrNot
              ? 'ShowNavBarSideBox'
              : 'notShowNavBarSideBox')
          }>
          <ul>{renderNavBtn()}</ul>
        </div>
      </div>
    </section>
  );
}

export default HeaderAdmin;
