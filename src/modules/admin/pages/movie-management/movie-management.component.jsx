import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import AlertPopUp from '../../component/alert-pop-up/alert-pop-up.component';
import './movie-management.component.scss';
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from 'date-format';
import {
  deleteMovieAction,
  getMovieListAction,
} from '../../../../store/actions/movie.actions';
import CreateTheater from '../../component/create-theater/create-theater.component';

function MovieManagement() {
  const [state, setState] = useState({
    showCreateTheater: false,
    pageNum: [],
    pageRender: 0,
    findMovieInput: '',
    movieSearchList: [],
    rerenderMovieList: [],
    maPhim: 0,
  });
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMovieListAction());
    return dispatch;
  }, [dispatch]);
  const alertInfo = {
    title: '',
    info: '',
  };

  if (JSON.parse(localStorage.getItem('searchFailed'))) {
    alertInfo.title = 'KHÔNG TÌM THẤY PHIM';
  } else {
    alertInfo.title = 'KHÔNG THỂ XÓA';
    alertInfo.info = 'Phim đã xếp lịch chiếu, không thể xóa.';
  }
  if (movieList.toString() !== state.rerenderMovieList.toString()) {
    setState({ ...state, rerenderMovieList: movieList });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const listMovieSearch = [];
    movieList.forEach((movie) => {
      if (
        movie.tenPhim.toLowerCase().includes(state.findMovieInput.toLowerCase())
      ) {
        listMovieSearch.push(movie);
      }
    });
    setState({ ...state, movieSearchList: listMovieSearch, pageRender: 0 });
    if (listMovieSearch.length === 0) {
      localStorage.setItem('searchFailed', '{"user":"failed"}');
      localStorage.setItem('adminUserFailed', '{"user":"failed"}');
    }
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setState({ ...state, findMovieInput: value });
  };

  const handlePrevBtn = () => {
    if (state.pageRender !== 0) {
      setState({ ...state, pageRender: state.pageRender - 10 });
    }
  };
  const handleNextBtn = () => {
    if (state.pageRender !== state.pageNum.slice(-2)[0] * 10) {
      setState({ ...state, pageRender: state.pageRender + 10 });
    }
  };

  const handleRenderSpecificPage = (value) => {
    if (value === 1) {
      setState({ ...state, pageRender: 0 });
    }
    const page = (value - 1) * 10;
    setState({ ...state, pageRender: page });
  };

  const handleRenderNumPage = () => {
    const movieRender =
      state.movieSearchList.length === 0 ? movieList : state.movieSearchList;
    if (movieRender.length !== 0) {
      const page = movieRender.length / 10;
      const pageLength = Math.floor(page);
      const pushToState = [];
      if (page > pageLength) {
        for (let i = 1; i <= pageLength + 1; i++) {
          pushToState.push(i);
        }
      } else {
        for (let i = 1; i <= pageLength; i++) {
          pushToState.push(i);
        }
      }
      if (state.pageNum.length !== pushToState.length) {
        setState({ ...state, pageNum: pushToState });
      }
    }
    return state.pageNum.map((btn, index) => (
      <li key={index}>
        <button
          onClick={() => handleRenderSpecificPage(btn)}
          className={(btn - 1) * 10 === state.pageRender ? 'active' : ''}>
          {btn}
        </button>
      </li>
    ));
  };

  const renderMovieList = () => {
    const movieRender =
      state.movieSearchList.length === 0 ? movieList : state.movieSearchList;
    return movieRender
      ?.slice(state.pageRender, state.pageRender + 10)
      .map((movie, index) => {
        const returnIndex = movieRender.indexOf(movie);
        const newNgay = dateFormat('dd/MM/yyyy', new Date(movie.ngayKhoiChieu));
        const protocal = 'https';
        const splitImgUrl = movie.hinhAnh.split('http');
        const httpsImg = protocal.concat(splitImgUrl[1]);
        return (
          <tr key={index}>
            <td>{returnIndex + 1}</td>
            <td>{movie.maPhim}</td>
            <td>{movie.tenPhim}</td>
            <td>
              <img src={httpsImg} alt='' />
            </td>
            <td>{newNgay}</td>
            <td>
              <button
                className='btn btn-success m-1'
                onClick={() => handleShowCreateTheater(true, movie.maPhim)}>
                Tạo lịch chiếu
              </button>
              <button
                onClick={async () => {
                  await deleteMovieAction(movie.maPhim);
                  dispatch(getMovieListAction());
                }}
                className='btn btn-danger m-1'>
                Xóa
              </button>
            </td>
          </tr>
        );
      });
  };

  const handleShowCreateTheater = (value, maPhim) => {
    setState({ ...state, showCreateTheater: value, maPhim: maPhim });
  };

  return (
    <section className='movieManage'>
      <h2 className='movieList'>DANH SÁCH PHIM</h2>

      <form onSubmit={handleSearch}>
        <input
          type='search'
          placeholder='Nhập tên phim'
          name='findUserInput'
          value={state.findMovieInput}
          onChange={handleInput}
        />
        <button type='submit' className='searchBtn'>
          Tìm
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã phim</th>
            <th>Tên phim</th>
            <th>Hình ảnh</th>
            <th>Ngày khởi chiếu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderMovieList()}</tbody>
      </table>
      <div className='movePageBtn'>
        <button onClick={handlePrevBtn} className='prevNextBtn'>
          <FontAwesomeIcon icon={solid('arrow-left-long')} className='arrow' />
          Prev
        </button>
        <ul>{handleRenderNumPage()}</ul>
        <button onClick={handleNextBtn} className='prevNextBtn'>
          Next
          <FontAwesomeIcon icon={solid('arrow-right-long')} className='arrow' />
        </button>
      </div>

      <AlertPopUp alertInfo={alertInfo} />
      <CreateTheater
        showCreateTheater={state.showCreateTheater}
        handleShowCreateTheater={() => handleShowCreateTheater(false, 0)}
        maPhim={state.maPhim}
      />
    </section>
  );
}

export default MovieManagement;
