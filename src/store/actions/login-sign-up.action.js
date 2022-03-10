import { SHOW_LOGINSIGNUP_COMPONENT } from '../constants/constants.reducer';

export const showLoginSignUpAction = (data) => (dispatch) => {
  dispatch({ type: SHOW_LOGINSIGNUP_COMPONENT, payload: data });
};
