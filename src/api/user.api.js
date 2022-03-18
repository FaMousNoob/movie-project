import axios from 'axios';
import { apiVersion, baseUrl } from '../configs/api.configs';

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

export const userListApi = () =>
  axios.get(
    `${baseUrl}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${apiVersion}`
  );

export const deleteUserApi = (user) => {
  const userAdmin = JSON.parse(localStorage.getItem('userLogin'));

  return axios.delete(
    `${baseUrl}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
    {
      headers: { Authorization: `Bearer ${userAdmin.accessToken}` },
    }
  );
};

export const createUserApi = (user) => {
  const userAdmin = JSON.parse(localStorage.getItem('userLogin'));
  return axios.post(`${baseUrl}/QuanLyNguoiDung/ThemNguoiDung`, user, {
    headers: { Authorization: `Bearer ${userAdmin.accessToken}` },
  });
};
