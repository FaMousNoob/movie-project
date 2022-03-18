import axios from 'axios';
import { apiVersion, baseUrl } from '../configs/api.configs';
export const getMovieListApi = () =>
  axios.get(`${baseUrl}/QuanLyPhim/LayDanhSachPhim?maNhom=${apiVersion}`);

export const getMovieDetailApi = (id) =>
  axios.get(`${baseUrl}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);

export const deleteMovieApi = (maPhim) => {
  const userAdmin = JSON.parse(localStorage.getItem('userLogin'));
  return axios.delete(`${baseUrl}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
    headers: { Authorization: `Bearer ${userAdmin.accessToken}` },
  });
};

export const uploadMovieApi = (phim) => {
  return axios.post(`${baseUrl}/QuanLyPhim/ThemPhimUploadHinh`, phim);
};

export const createTheaterApi = (theater) => {
  const userAdmin = JSON.parse(localStorage.getItem('userLogin'));
  return axios.post(`${baseUrl}/QuanLyDatVe/TaoLichChieu`, theater, {
    headers: { Authorization: `Bearer ${userAdmin.accessToken}` },
  });
};
