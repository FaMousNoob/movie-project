import {
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
} from '../constants/constants.reducer';
import { getMovieDetailApi, getMovieListApi } from '../../api/movie.api';

export const getMovieListAction = () => {
  return (dispatch) => {
    getMovieListApi()
      .then((res) => {
        dispatch({ type: GET_MOVIE_LIST, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const getMovieDetailAction = (id) => (dispatch) => {
  getMovieDetailApi(id)
    .then((res) => {
      dispatch({ type: GET_MOVIE_DETAIL, payload: res.data });
    })
    .catch((error) => console.log(error));
};
