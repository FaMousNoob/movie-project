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
  const [listChair, setlistChair] = useState({ chairs: '', tongGiaVe: 0 });
  const [showSuccessOrFalseAlert, setshowSuccessOrFalseAlert] = useState({
    success: false,
    falsely: false,
  });

  // showorderedSuccess
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
      setlistChair({ ...listChair, chairs: chairs.join(', ') });
    }
    return listChair.chairs;
  };

  //render tong gia ve
  const renderTotalCost = () => {
    let total = 0;
    booking.danhSachGhe?.forEach((chair) => {
      if (chair.dangChon) {
        total += parseInt(chair.giaVe);
      }
    });
    if (total !== listChair.tongGiaVe) {
      setlistChair({ ...listChair, tongGiaVe: total });
    }
    return listChair.tongGiaVe;
  };

  //if order success, this function runs onClick from dat ghe button
  const showSuccessOrFalse = (name, trueOrFalse) => {
    setshowSuccessOrFalseAlert({
      ...showSuccessOrFalseAlert,
      [name]: trueOrFalse,
    });
  };

  //dispatch to orderChairs
  const orderChair = () => {
    const total = booking.danhSachGhe.some((chair) => chair.dangChon);
    if (total) {
      const orderedChair = booking.danhSachGhe.filter(
        (chair) => chair.dangChon
      );
      dispatch(orderChairAction(id, orderedChair));
      showSuccessOrFalse('success', true);
    } else {
      showSuccessOrFalse('falsely', true);
    }
  };

  //render the previous and booking buttons
  const renderbookingBtns = () => (
    <div className='bookingBtns'>
      <button onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={solid('left-long')} className='arrowLeft' />
        QUAY L???I
      </button>
      <button onClick={orderChair}>
        ?????T GH???
        <FontAwesomeIcon icon={solid('right-long')} className='arrowRight' />
      </button>
    </div>
  );

  const { thongTinPhim } = booking;

  const returnHttpsImg = (movie) => {
    const protocal = 'https';
    const splitImgUrl = movie.hinhAnh?.split('http');
    return protocal.concat(splitImgUrl[1]);
  };

  return (
    <section className='container bookingTicket'>
      <div className='bookingInfo'>
        <div className='row'>
          <div className='col-4 col-lg-12 imgContain'>
            {booking.danhSachGhe ? (
              <img src={returnHttpsImg(thongTinPhim)} alt='' />
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
                  <span>R???p: </span>
                  {booking.danhSachGhe ? (
                    thongTinPhim?.tenCumRap
                  ) : (
                    <span className='loadingP skeleton'></span>
                  )}
                </p>
              </li>
              <li>
                <p>
                  <span>Su???t chi???u: </span>
                  {booking.danhSachGhe ? (
                    thongTinPhim?.gioChieu
                  ) : (
                    <span className='loadingP skeleton'></span>
                  )}
                </p>
              </li>
              <li>
                <p>
                  <span>Gh???: </span>
                  {renderNumOfChair()}
                </p>
              </li>
              <li>
                <p>
                  <span>T???ng: </span>
                  <span className='giaGhe'>{renderTotalCost()} VN??</span>
                </p>
              </li>
              <li>
                <p className='warningListChair'>S??? gh??? ?????t kh??ng ???????c qu?? 8.</p>
              </li>
            </ul>
            <div className='btnWindow'>{renderbookingBtns()}</div>
          </div>
        </div>
      </div>
      <div className='bookingChairs'>
        <h3>CH???N GH???: {listChair.chairs}</h3>
        <div className='chairs'>
          <ul>
            <li>
              <span className='span1'></span>
              <p>Gh??? ??ang ch???n</p>
            </li>
            <li>
              <span className='span2'></span>
              <p>gh??? ???? b??n</p>
            </li>
            <li>
              <span className='span3'></span>
              <p>C?? th??? ch???n</p>
            </li>
          </ul>
          <p className='screen'>M??n h??nh</p>
          <div className='listChair'>{renderChair()}</div>
        </div>
        <div className='btnPhone'>{renderbookingBtns()}</div>
      </div>

      <div
        className={
          'bookingSuccess ' + (showSuccessOrFalseAlert.success ? '' : 'notShow')
        }>
        <div className='successOrFalseBox'>
          <h3>?????T GH??? TH??NH C??NG</h3>
          <FontAwesomeIcon icon={solid('check')} className='checkMark' />
          <p>M???i b???n v??? trang th??ng tin t??i kho???n ????? xem v?? ???? ?????t</p>
          <div>
            <button
              className='successBtn'
              onClick={() => {
                navigate('/user');
              }}>
              T??i Kho???n
            </button>
            <button
              className='successBtn'
              onClick={() => {
                window.location.reload(false);
              }}>
              Ti???p t???c
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => showSuccessOrFalse('falsely', false)}
        className={
          'bookingSuccess ' + (showSuccessOrFalseAlert.falsely ? '' : 'notShow')
        }>
        <div className='successOrFalseBox'>
          <h3>VUI L??NG CH???N GH???</h3>
          <button className='xMark'>
            <FontAwesomeIcon icon={solid('xMark')} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default BookingTicket;
