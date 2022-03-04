import { signUpApi } from '../../api/sign-up.api';

export const signUpAction = (user) => async (dispatch) => {
  try {
    const res = await signUpApi(user);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
