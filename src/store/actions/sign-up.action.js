import { signUpApi } from '../../api/sign-up.api';

export const signUpAction = (user) => async (dispatch) => {
  try {
    await signUpApi(user);
  } catch (error) {
    return false;
  }
};
