import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import './footer.component.scss';

const arrowFont = () => (
  <FontAwesomeIcon icon={solid('angles-right')} className='footerArrow' />
);

function Footer() {
  return (
    <section className='footer'>
      <ul className='footer1 container'>
        <li className='footerLi'>
          <h4> GIỚI THIỆU</h4>
          <p>{arrowFont()} về chúng tôi</p>
          <span className='footerHover'>{arrowFont()} thỏa thuận sử dụng</span>
          <span className='footerHover'>{arrowFont()} quy chế hoạt động</span>
          <span className='footerHover'>{arrowFont()} chính sách bảo mật</span>
        </li>
        <li className='footerLi'>
          <h4>GÓC ĐIỆN ẢNH</h4>
          <p>{arrowFont()} thể loại phim</p>
          <span className='footerHover'>{arrowFont()} binh luận phim</span>
          <span className='footerHover'>{arrowFont()} blog điện ảnh</span>
          <span className='footerHover'>{arrowFont()} phim hay tháng</span>
        </li>
        <li className='footerLi'>
          <h4>HỖ TRỢ</h4>
          <p>{arrowFont()} góp ý</p>
          <span className='footerHover'>{arrowFont()} sale & services</span>
          <span className='footerHover'>{arrowFont()} rạp / giá vé</span>
          <span className='footerHover'>{arrowFont()} tuyển dụng</span>
        </li>
        <li>
          <h4>KẾT NỐI GALAXY CINEMA</h4>
          <div>
            <FontAwesomeIcon
              icon={brands('facebook-square')}
              className='brands footerHover'
            />
            <FontAwesomeIcon
              icon={brands('youtube')}
              className='brands footerHover'
            />
            <FontAwesomeIcon
              icon={brands('instagram')}
              className='brands footerHover'
            />
          </div>
          <h4 className='footerH4'>download app</h4>
          <div>
            <FontAwesomeIcon
              icon={brands('apple')}
              className='brands footerHover'
            />
            <FontAwesomeIcon
              icon={brands('google-play')}
              className='brands footerHover'
            />
          </div>
        </li>
      </ul>
      <div className='footer2 container'>
        <img src='/images/galaxy-logo-footer.png' alt='' />
        <p>
          Công Ty Cổ Phần Phim Thiên Ngân, Tầng 5, Toà Nhà Mặt Trời Sông Hồng,
          23 Phan Chu Trinh, Phường Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội.
        </p>
      </div>
    </section>
  );
}

export default Footer;
