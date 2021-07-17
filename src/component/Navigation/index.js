import React from 'react';
import logo from '../../asset/logo.png';
import './style.scss';
import { IoHome } from 'react-icons/io5';
import { IoDocuments } from 'react-icons/io5';
import { FaUserTimes } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { useDispatch } from 'react-redux';
export default function Index() {
  const dispatch = useDispatch();
  return (
    <div className="nav">
      <div className="intro">
        <img src={logo} alt="Logo" />
        <span className="intro-name">Miki</span>
        <span>Tận hưởng thế giới thú cưng của bạn </span>
      </div>
      <div className="navigate">
        <div className="navigate-home">
          <a
            onClick={() => {
              dispatch({ type: 'GET_USERS' });
              dispatch({ type: 'LOADING' });
            }}
          >
            <IoHome />
            <span className="navigate-home-span">Trang chủ</span>
          </a>
        </div>
        <div className="navigate-home">
          <a
            onClick={() => {
              dispatch({ type: 'GET_POSTS' });
              dispatch({ type: 'LOADING' });
            }}
          >
            <IoDocuments />
            <span className="navigate-home-span">Số lượng bài viết</span>
          </a>
        </div>
        <div className="navigate-home">
          <a
            onClick={() => {
              dispatch({ type: 'GET_POSTS_REPORTED' });
              dispatch({ type: 'LOADING' });
            }}
          >
            <GoReport />
            <span className="navigate-home-span">Bài viết báo cáo</span>
          </a>
        </div>
        {/* <div className="navigate-home">
          <a>
            <FaUserTimes />
            <span className="navigate-home-span">Người dùng báo cáo</span>
          </a>
        </div> */}
      </div>
    </div>
  );
}
