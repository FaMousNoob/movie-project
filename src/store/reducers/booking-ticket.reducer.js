import { CHOICE_CHAIR, GET_CHAIR_LIST } from '../constants/constants.reducer';

const initialState = {
  booking: [],
};

export const bookingTicketReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAIR_LIST:
      state.booking = payload;
      return { ...state };

    case CHOICE_CHAIR: {
      const { danhSachGhe } = state.booking;
      const index = state.booking.danhSachGhe.findIndex(
        (chair) => chair.maGhe === payload.maGhe
      );

      if (index !== -1) {
        const oldChair = { ...danhSachGhe[index] };
        const newChair = { ...oldChair, dangChon: !oldChair.dangChon };
        danhSachGhe[index] = newChair;
        state.booking.danhSachGhe = danhSachGhe;
      }
      return { ...state };
    }

    default:
      return state;
  }
};
