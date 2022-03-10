import { getChairListApi, orderChairApi } from '../../api/booking-ticket.api';
import { CHOICE_CHAIR, GET_CHAIR_LIST } from '../constants/constants.reducer';

export const getBookingChairListAction = (id) => async (dispatch) => {
  try {
    const res = await getChairListApi(id);
    dispatch({ type: GET_CHAIR_LIST, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const choiceChairAction = (chair) => {
  return { type: CHOICE_CHAIR, payload: { ...chair, dangChon: true } };
};
export const orderChairAction =
  (maLichChieu, danhSachGhe) => async (dispatch) => {
    try {
      await orderChairApi(maLichChieu, danhSachGhe);
    } catch (error) {
      console.log(error);
    }
  };
