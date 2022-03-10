import axios from 'axios';
import { baseUrl } from '../configs/api.configs';

export const userInfoApi = (user) =>
  axios.post(`${baseUrl}/QuanLyNguoiDung/ThongTinTaiKhoan`, user);

export const updateUserInfoApi = (userInfo) => {
  const user = JSON.parse(localStorage.getItem('userLogin'));
  const newInfo = { ...userInfo, maLoaiNguoiDung: 'KhachHang' };
  return axios.put(
    `${baseUrl}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    newInfo,
    { headers: { Authorization: `Bearer ${user.accessToken}` } }
  );
};
