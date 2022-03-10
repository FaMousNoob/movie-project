import axios from 'axios';
import { baseUrl } from '../configs/api.configs';

export const getChairListApi = (id) =>
  axios.get(`${baseUrl}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);

export const orderChairApi = (maLichChieu, danhSachVe) => {
  const user = JSON.parse(localStorage.getItem('userLogin'));
  return axios.post(
    `${baseUrl}/QuanLyDatVe/DatVe`,
    {
      maLichChieu,
      danhSachVe,
      taiKhoanNguoiDung: user.taiKhoan,
    },
    { headers: { Authorization: `Bearer ${user.accessToken}` } }
  );
};
