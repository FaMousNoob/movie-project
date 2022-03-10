import { updateUserInfoApi, userInfoApi } from '../../api/user.api';
import { GET_USER_INFO } from '../constants/constants.reducer';

export const getUserInfoAction = (user) => async (dispatch) => {
  try {
    const res = await userInfoApi(user);
    dispatch({ type: GET_USER_INFO, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfoAction = (userInfo) => async (dispatch) => {
  try {
    await updateUserInfoApi(userInfo);
  } catch (error) {
    console.log(error);
  }
};
