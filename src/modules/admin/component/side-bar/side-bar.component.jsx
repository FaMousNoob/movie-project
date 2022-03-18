import React from 'react';
import { NavLink } from 'react-router-dom';

import './side-bar.component.scss';

function SideBar() {
  return (
    <section className='sideBar'>
      <h4>Menu</h4>

      <ul>
        <li>
          <NavLink className='sideBarLink' to='/admin/user-management'>
            Quản lí tài khoản
          </NavLink>
        </li>
        <li>
          <NavLink className='sideBarLink' to='/admin/user-add'>
            Tạo tài khoản
          </NavLink>
        </li>
        <li>
          <NavLink className='sideBarLink' to='/admin/movie-management'>
            Quản lí phim
          </NavLink>
        </li>
        <li>
          <NavLink className='sideBarLink' to='/admin/movie-add'>
            Tạo phim
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
