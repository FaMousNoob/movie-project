import axios from 'axios';
import { baseUrl } from '../configs/api.configs';

export const signUpApi = (user) =>
  axios.post(`${baseUrl}/QuanLyNguoiDung/DangKy`, user);
