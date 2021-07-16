import React, { useEffect, useState } from 'react';
import { TiGroup } from 'react-icons/ti';
import { IoDocuments } from 'react-icons/io5';
import { FaUserTimes } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import {
  urlAllRoom,
  urlPosts,
  urlPostsReported,
  urlUsers,
} from '../../constant';
import { useDispatch } from 'react-redux';
export default function Header() {
  const [users, setUsers] = useState();
  const [postes, setPostes] = useState();
  const [report, setReport] = useState();
  const [rooms, setRooms] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDataUser = async () => {
      const promise1 = axios.get(urlUsers);
      const promise2 = axios.get(urlPosts);
      const promise3 = axios.get(urlPostsReported);
      const promise4 = axios.get(urlAllRoom);
      Promise.all([promise1, promise2, promise3, promise4]).then(function (
        values
      ) {
        setUsers(values[0].data.length);
        setPostes(values[1].data.length);
        setReport(values[2].data.length);
        setRooms(values[3].data.length);
      });
    };
    fetchDataUser();
  }, []);
  return (
    <div className="header">
      <div className="header__statistic">
        <h1>Thống Kê</h1>
        <Link to="/" className="header__statistic-link" href="#">
          <IoLogOut className="icon-log-out" />
        </Link>
      </div>
      <div className="header__route">
        <a
          onClick={() => {
            dispatch({ type: 'GET_USERS' });
          }}
          className="header__route-flex"
        >
          <TiGroup className="header__route-flex-icon users" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              Số lượng người dùng
            </span>
            <span className="header__route-flex-text-number">{users}</span>
          </div>
        </a>
        <a
          onClick={() => {
            dispatch({ type: 'GET_POSTS' });
          }}
          className="header__route-flex"
        >
          <IoDocuments className="header__route-flex-icon posts" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              Số lượng bài viết
            </span>
            <span className="header__route-flex-text-number">{postes}</span>
          </div>
        </a>
        <a
          onClick={() => {
            dispatch({ type: 'GET_POSTS_REPORTED' });
          }}
          className="header__route-flex"
        >
          <GoReport className="header__route-flex-icon user-report" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              Bài viết bị báo cáo
            </span>
            <span className="header__route-flex-text-number">{report}</span>
          </div>
        </a>
        <a className="header__route-flex">
          <FaUserTimes className="header__route-flex-icon post-report" />
          <div className="header__route-flex-text">
            <span className="header__route-flex-text-title">
              Tổng cuộc chat
            </span>
            <span className="header__route-flex-text-number">{rooms}</span>
          </div>
        </a>
      </div>
    </div>
  );
}
