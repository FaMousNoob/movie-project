import { GET_USER_INFO, GET_USER_LIST } from '../constants/constants.reducer';

const initialState = {
  userInfo: {},
  userList: [],
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_INFO:
      state.userInfo = payload;
      return { ...state };

    case GET_USER_LIST:
      state.userList = payload;
      return { ...state };

    default:
      return state;
  }
};
