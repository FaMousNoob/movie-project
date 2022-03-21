import { signUpApi } from '../../api/sign-up.api';

export const signUpAction = async (user) => {
  try {
    const res = await signUpApi(user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
