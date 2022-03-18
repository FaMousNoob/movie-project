import {
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
} from '../constants/constants.reducer';
import {
  createTheaterApi,
  deleteMovieApi,
  getMovieDetailApi,
  getMovieListApi,
  uploadMovieApi,
} from '../../api/movie.api';

export const getMovieListAction = () => {
  return (dispatch) => {
    getMovieListApi()
      .then((res) => {
        dispatch({ type: GET_MOVIE_LIST, payload: res.data });
      })
      .catch((error) => false);
  };
};

export const getMovieDetailAction = (id) => (dispatch) => {
  getMovieDetailApi(id)
    .then((res) => {
      dispatch({ type: GET_MOVIE_DETAIL, payload: res.data });
    })
    .catch((error) => false);
};

export const deleteMovieAction = async (maPhim) => {
  try {
    await deleteMovieApi(maPhim);
  } catch (error) {
    localStorage.setItem('adminUserFailed', '{"user":"failed"}');
  }
};

export const uploadMovieAction = async (phim) => {
  try {
    await uploadMovieApi(phim);
    localStorage.setItem('adminUserFailed', '{"user":"failed"}');
    localStorage.setItem('adminUserCreated', '{"user":"success"}');
  } catch (error) {
    localStorage.setItem('adminUserFailed', '{"user":"failed"}');
  }
};

export const createTheaterAction = async (theater) => {
  try {
    await createTheaterApi(theater);
    localStorage.setItem('createTheaterSuccess', '{"user":"success"}');
  } catch (error) {
    localStorage.setItem('createTheaterFail', '{"user":"success"}');
  }
};
