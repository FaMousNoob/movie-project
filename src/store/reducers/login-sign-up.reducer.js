import { SHOW_LOGINSIGNUP_COMPONENT } from '../constants/constants.reducer';

const initialState = {
  activeLoginSignUp: false,
};

export const activeLoginSignUpReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_LOGINSIGNUP_COMPONENT:
      state.activeLoginSignUp = payload;
      return { ...state };

    default:
      return state;
  }
};
