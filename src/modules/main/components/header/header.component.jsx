import React, { useState } from 'react';
import './header.component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoginSignUpAction } from '../../../../store/actions/login-sign-up.action';

function Header() {
  //drop down menu in phone screen
  const [state, setState] = useState({
    activeDropDown: false,
    searchMovieValue: '',
  });
  const dispatch = useDispatch();
  const handleDropDown = () => {
    setState({
      ...state,
      activeDropDown: !state.activeDropDown,
    });
  };

  const movieList = useSelector((state) => state.movie.movieList);

  const handleChange = (e) => {
    const { value } = e.target;
    setState({ ...state, searchMovieValue: value });
    console.log(state.searchMovieValue);
  };

  const handleShowMovieSearch = () => {
    const result = movieList?.filter((movie) =>
      movie.tenPhim.toLowerCase().includes(state.searchMovieValue.toLowerCase())
    );
    return result.map((movie, index) => (
      <Link
        key={index}
        to={`/movie-detail/${movie.maPhim}`}
        className='linkTo'
        onClick={() => {
          setState({ ...state, searchMovieValue: '' });
        }}>
        <li>{movie.tenPhim}</li>
      </Link>
    ));
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
        <div className='mainSearchMovieBox'>
          <div className='mainSearchMovie'>
            <FontAwesomeIcon
              icon={solid('magnifying-glass')}
              className='magnifying'
            />
            <input
              value={state.searchMovieValue}
              onChange={handleChange}
              type='text'
              placeholder='Tìm tên phim'
            />
          </div>
          <div className='listMovieSearch'>
            <ul className={state.searchMovieValue === '' ? 'noneDisplay' : ''}>
              {handleShowMovieSearch()}
            </ul>
          </div>
        </div>
        <div className='navbarRight'>
          {loginOrSignOutBtn()}
          <div
            className={
              'dropDownMenu ' + (state.activeDropDown ? 'activeDropDown' : '')
            }>
            <button onClick={handleDropDown}>
              {state.activeDropDown ? (
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
                state.activeDropDown ? 'activeUlDrop' : 'deactiveUlDrop'
              }>
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
