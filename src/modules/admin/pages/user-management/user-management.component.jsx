import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAction,
  getUserListAction,
} from '../../../../store/actions/user.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './user-management.component.scss';
import AlertPopUp from '../../component/alert-pop-up/alert-pop-up.component';

function UserManagement() {
  const [state, setstate] = useState({
    pageNum: [],
    pageRender: 0,
    findUserInput: '',
    userSearchList: [],
    rerenderUserList: [],
  });
  const { userList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);
  const alertInfo = {
    title: '',
    info: '',
  };
  if (JSON.parse(localStorage.getItem('searchFailed'))) {
    alertInfo.title = 'KHÔNG TÌM THẤY TÀI KHOẢN';
  } else {
    alertInfo.title = 'KHÔNG THỂ XÓA';
    alertInfo.info = 'Tài khoản đã đặt vé, không thể xóa.';
  }

  if (userList.toString() !== state.rerenderUserList.toString()) {
    setstate({ ...state, rerenderUserList: userList });
  }

  const handlePrevBtn = () => {
    if (state.pageRender !== 0) {
      setstate({ ...state, pageRender: state.pageRender - 10 });
    }
  };
  const handleNextBtn = () => {
    if (state.pageRender !== state.pageNum.slice(-2)[0] * 10) {
      setstate({ ...state, pageRender: state.pageRender + 10 });
    }
  };

  //search handle
  const handleSearch = (e) => {
    e.preventDefault();
    const listUserSearch = [];
    userList.forEach((user) => {
      if (
        user.taiKhoan.toLowerCase().includes(state.findUserInput.toLowerCase())
      ) {
        listUserSearch.push(user);
      }
    });
    setstate({ ...state, userSearchList: listUserSearch, pageRender: 0 });
    if (listUserSearch.length === 0) {
      localStorage.setItem('searchFailed', '{"user":"failed"}');
      localStorage.setItem('adminUserFailed', '{"user":"failed"}');
    }
  };

  //change findUserInput data
  const handleInput = (e) => {
    const { value } = e.target;
    setstate({ ...state, findUserInput: value });
  };

  const handleRenderSpecificPage = (value) => {
    if (value === 1) {
      setstate({ ...state, pageRender: 0 });
    }
    const page = (value - 1) * 10;
    setstate({ ...state, pageRender: page });
  };

  const handleRenderNumPage = () => {
    const userRender =
      state.userSearchList.length === 0 ? userList : state.userSearchList;
    if (userRender.length !== 0) {
      const page = userRender.length / 10;
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
        setstate({ ...state, pageNum: pushToState });
      }
    }
    return state.pageNum.map((btn, index) => (
      <li key={index}>
        <button
          className={(btn - 1) * 10 === state.pageRender ? 'active' : ''}
          onClick={() => handleRenderSpecificPage(btn)}>
          {btn}
        </button>
      </li>
    ));
  };

  const renderUserList = () => {
    const UserList =
      state.userSearchList.length === 0 ? userList : state.userSearchList;
    return UserList?.slice(state.pageRender, state.pageRender + 10).map(
      (user, index) => {
        const returnIndex = UserList.indexOf(user);
        return (
          <tr key={index}>
            <td>{returnIndex + 1}</td>
            <td>{user.taiKhoan}</td>
            <td>{user.matKhau}</td>
            <td>{user.hoTen}</td>
            <td>{user.email}</td>
            <td>{user.maLoaiNguoiDung}</td>
            <td>{user.soDt}</td>
            <td>
              <button
                onClick={async () => {
                  await deleteUserAction(user.taiKhoan);
                  dispatch(getUserListAction());
                }}
                className='btn btn-danger m-1'>
                Xóa
              </button>
            </td>
          </tr>
        );
      }
    );
  };
  return (
    <section className='userManagement'>
      <h2>Tìm người dùng</h2>
      <form onSubmit={handleSearch}>
        <input
          type='search'
          placeholder='Nhập tài khoản'
          name='findUserInput'
          value={state.findUserInput}
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
            <th>Tài khoản</th>
            <th>Mật khẩu</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Loại người dùng</th>
            <th>Số điện thoại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderUserList()}</tbody>
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
    </section>
  );
}

export default UserManagement;
