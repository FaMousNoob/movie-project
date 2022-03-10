import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  choiceChairAction,
  getBookingChairListAction,
  orderChairAction,
} from '../../../../store/actions/booking-ticket.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './booking-ticket.component.scss';

function BookingTicket() {
  const [listChair, setlistChair] = useState({ chairs: '' });
  const [showorderedSuccess, setshoworderedSuccess] = useState({
    isTrueOrNot: false,
  });
  const { booking } = useSelector((state) => state.bookingTicket);
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBookingChairListAction(id));
  }, [dispatch, id]);

  //set class for list of chairs buttons
  const returnBtnClass = (btn) => {
    if (btn.daDat) {
      return 'daBan';
    } else if (btn.dangChon) {
      return 'dangChon';
    } else {
      return 'coTheChon';
    }
  };

  //render list of chairs
  const renderChair = () => {
    return booking.danhSachGhe?.slice(0, 90).map((chair, index) => (
      <button
        disabled={chair.daDat}
        onClick={() => handleChoiceChair(chair)}
        className={returnBtnClass(chair)}
        key={index}>
        {chair.tenGhe}
      </button>
    ));
  };

  // add dangChon is true or false to active dangChon class
  const handleChoiceChair = (chair) => {
    let limitedChairs = 0;
    booking.danhSachGhe.forEach((chair) => {
      if (chair.dangChon) {
        limitedChairs += 1;
      }
    });
    if (limitedChairs >= 8) {
      if (limitedChairs === 8 && chair.dangChon === true) {
        dispatch(choiceChairAction(chair));
      }
    } else {
      dispatch(choiceChairAction(chair));
    }
  };

  //render list of chairs that has been chosen
  const renderNumOfChair = () => {
    const chairs = [];
    booking.danhSachGhe?.forEach((chair) => {
      if (chair.dangChon) {
        chairs.push(chair.stt);
      }
    });
    if (chairs.join(', ') !== listChair.chairs) {
      setlistChair({ chairs: chairs.join(', ') });
    }
  };
  renderNumOfChair();

  const showOrderedSuccess = () => {
    setshoworderedSuccess({ isTrueOrNot: true });
  };

  //dispatch to orderChairs
  const orderChair = () => {
    const orderedChair = booking.danhSachGhe.filter((chair) => chair.dangChon);
    dispatch(orderChairAction(id, orderedChair));
    showOrderedSuccess();
  };

  //render the previous and booking buttons
  const renderbookingBtns = () => (
    <div className='bookingBtns'>
      <button onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={solid('left-long')} className='arrowLeft' />
        QUAY LẠI
      </button>
      <button onClick={orderChair}>
        ĐẶT GHẾ
        <FontAwesomeIcon icon={solid('right-long')} className='arrowRight' />
      </button>
    </div>
  );

  const { thongTinPhim } = booking;
  return (
    <section className='container bookingTicket'>
      <div className='bookingInfo'>
        <div className='row'>
          <div className='col-4 col-lg-12 imgContain'>
            {booking.danhSachGhe ? (
              <img src={thongTinPhim?.hinhAnh} alt='' />
            ) : (
              <div className='loadingImg skeleton'></div>
            )}
          </div>
          <div className='col-8 col-lg-12'>
            {booking.danhSachGhe ? (
              <h2>{thongTinPhim?.tenPhim}</h2>
            ) : (
              <div className='loadingTitle skeleton'></div>
            )}

            <ul>
              <li>
                <p>
                  <span>Rạp: </span>
                  {booking.danhSachGhe ? (
                    thongTinPhim?.tenCumRap
                  ) : (
                    <span className='loadingP skeleton'></span>
                  )}
                </p>
              </li>
              <li>
                <p>
                  <span>Suất chiếu: </span>
                  {booking.danhSachGhe ? (
                    thongTinPhim?.gioChieu
                  ) : (
                    <span className='loadingP skeleton'></span>
                  )}
                </p>
              </li>
              <li>
                <p>
                  <span>Ghế: </span>
                  {listChair.chairs}
                </p>
              </li>
              <li>
                <p className='warningListChair'>Số ghế đặt không được quá 8.</p>
              </li>
            </ul>
            <div className='btnWindow'>{renderbookingBtns()}</div>
          </div>
        </div>
      </div>
      <div className='bookingChairs'>
        <h3>CHỌN GHẾ: {listChair.chairs}</h3>
        <div className='chairs'>
          <ul>
            <li>
              <span className='span1'></span>
              <p>Ghế đang chọn</p>
            </li>
            <li>
              <span className='span2'></span>
              <p>ghế đã bán</p>
            </li>
            <li>
              <span className='span3'></span>
              <p>Có thể chọn</p>
            </li>
          </ul>
          <p className='screen'>Màn hình</p>
          <div className='listChair'>{renderChair()}</div>
        </div>
        <div className='btnPhone'>{renderbookingBtns()}</div>
      </div>

      <div
        className={
          'bookingSuccess ' +
          (showorderedSuccess.isTrueOrNot ? 'show' : 'notShow')
        }>
        <div className='successBox'>
          <h3>ĐẶT GHẾ THÀNH CÔNG</h3>
          <FontAwesomeIcon icon={solid('check')} className='checkMark' />
          <div>
            <button
              onClick={() => {
                navigate('/');
              }}>
              Trang chủ
            </button>
            <button
              onClick={() => {
                window.location.reload(false);
              }}>
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingTicket;
