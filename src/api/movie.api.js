import axios from 'axios';
import { baseUrl } from '../configs/api.configs';
export const getMovieListApi = () =>
  axios.get(`${baseUrl}/QuanLyPhim/LayDanhSachPhim?maNhom=GP11`);

export const getMovieDetailApi = (id) =>
  axios.get(`${baseUrl}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
