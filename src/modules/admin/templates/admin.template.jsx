import React from 'react';
import HeaderAdmin from '../component/header/header-admin.component';
import SideBar from '../component/side-bar/side-bar.component';
import './admin.template.scss';

function AdminTemplate({ children }) {
  return (
    <section>
      <HeaderAdmin />
      <div className='adminTemplate'>
        <div className='sideBarContain'>
          <SideBar />
        </div>

        <div className='container'>{children}</div>
      </div>
    </section>
  );
}

export default AdminTemplate;
