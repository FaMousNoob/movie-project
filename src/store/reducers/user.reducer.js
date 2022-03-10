import { GET_USER_INFO } from '../constants/constants.reducer';

const initialState = {
  userInfo: {},
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_INFO:
      state.userInfo = payload;
      return { ...state };

    default:
      return state;
  }
};
