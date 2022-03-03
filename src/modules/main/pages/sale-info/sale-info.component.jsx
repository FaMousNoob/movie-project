import React from 'react';
import Sale from '../../components/sale/sale.component';
import SideMovies from '../../components/side-movies/side-movies.component';
import './sale-info.component.scss';
function SaleInfo() {
  return (
    <section className='container saleInfo'>
      <div className='row'>
        <div className='col-md-8'>
          {' '}
          <Sale />
        </div>
        <div className='col-md-4 saleSideMovies'>
          <SideMovies />
        </div>
      </div>

      <div className='saleMain'>
        <h3>GALAXY CINEMA</h3>
        <p>
          Khuyến mãi mới sẽ bao gồm các bài viết giới thiệu những ưu đãi, khuyến
          mãi, quà tặng, vô cùng hấp dẫn cho khách hàng như giảm giá vé, tặng
          vé, tặng voucher, bốc thăm trúng thưởng... Truy cập vào khuyến mãi
          mới, bạn sẽ tìm thấy vô vàn lợi ích tuyệt vời và giá trị đến từ Galaxy
          cùng các đối tác.
        </p>
      </div>
    </section>
  );
}

export default SaleInfo;
