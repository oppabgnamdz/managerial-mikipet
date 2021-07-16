import React from 'react';
import { TiGroup } from 'react-icons/ti';
import { IoDocuments } from 'react-icons/io5';
import { FaUserTimes } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './style.scss';
export default function Header() {
  return (
    <div className="header">
      <div className="header__statistic">
        <h1>Thống Kê</h1>
        <Link to="/" className="header__statistic-link" href="#">
          <IoLogOut className="icon-log-out" />
        </Link>
      </div>
      <div className="header__route">
        <a href="#" className="header__route-flex">
          <TiGroup className="header__route-flex-icon users" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              Số lượng người dùng
            </span>
            <span className="header__route-flex-text-number">99</span>
          </div>
        </a>
        <a href="#" className="header__route-flex">
          <IoDocuments className="header__route-flex-icon posts" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              Số lượng bài viết
            </span>
            <span className="header__route-flex-text-number">250</span>
          </div>
        </a>
        <a href="#" className="header__route-flex">
          <FaUserTimes className="header__route-flex-icon user-report" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              Người dùng báo cáo
            </span>
            <span className="header__route-flex-text-number">06</span>
          </div>
        </a>
        <a href="#" className="header__route-flex">
          <GoReport className="header__route-flex-icon post-report" />
          <div className="header__route-flex-text">
            <span className="header__route-flex-text-title">
              Bài viết báo cáo
            </span>
            <span className="header__route-flex-text-number">03</span>
          </div>
        </a>
      </div>
    </div>
  );
}
