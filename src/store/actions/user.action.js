import {
  createUserApi,
  deleteUserApi,
  updateUserInfoApi,
  userInfoApi,
  userListApi,
} from '../../api/user.api';
import { GET_USER_INFO, GET_USER_LIST } from '../constants/constants.reducer';

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

export const getUserListAction = () => async (dispatch) => {
  try {
    const res = await userListApi();
    dispatch({ type: GET_USER_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserAction = async (user) => {
  try {
    const res = await deleteUserApi(user);
    return res.data;
  } catch (err) {
    localStorage.setItem('adminUserFailed', '{"user":"failed"}');
    console.log(err);
  }
};

export const createUserAction = async (user) => {
  try {
    await createUserApi(user);
    localStorage.setItem('adminUserFailed', '{"user":"failed"}');
    localStorage.setItem('adminUserCreated', '{"user":"success"}');
  } catch (error) {
    localStorage.setItem('adminUserFailed', '{"user":"failed"}');
    console.log(error);
  }
};
