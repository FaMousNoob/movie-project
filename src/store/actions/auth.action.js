import { loginApi } from '../../api/auth.api';

export const loginAction = (userLogin) => async (dispatch) => {
  try {
    // localStorage.setItem('userLogin', 'pending');
    const res = await loginApi(userLogin);
    console.log(res.data);
    localStorage.setItem('userLogin', JSON.stringify(res.data));
    localStorage.removeItem('loginFailed');
    window.location.reload(false);
  } catch (error) {
    localStorage.setItem('loginFailed', '{"user":"failed"}');
    console.log(error);
  }
};
