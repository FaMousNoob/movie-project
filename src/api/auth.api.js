import axios from 'axios';
import { baseUrl } from '../configs/api.configs';

export const loginApi = (userLogin) =>
  axios.post(`${baseUrl}/QuanLyNguoiDung/DangNhap`, userLogin);
