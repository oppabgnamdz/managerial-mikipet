import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserTimes } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { IoDocuments, IoLogOut } from 'react-icons/io5';
import { TiGroup } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import {
  urlAllRoom,
  urlPosts,
  urlPostsReported,
  urlUpdatePassword,
  urlUsers,
} from '../../constant';
import Loading from '../Loading';
import './style.scss';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#39cccc',
    boxShadow: ` rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 2) 0px 2px 6px 2px`,
    borderRadius: '1rem',
  },
};
Modal.setAppElement(document.getElementById('root'));
export default function Header() {
  const [users, setUsers] = useState();
  const [postes, setPostes] = useState();
  const [report, setReport] = useState();
  const [rooms, setRooms] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const reRender = useSelector((state) => state.reRender);
  const loading = useSelector((state) => state.loading);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  function afterOpenModal(e) {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(urlUpdatePassword, {
        account: 'admin',
        password: newPassword,
      });
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };
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
  }, [reRender]);
  return (
    <div className="header">
      <div className="header__statistic">
        <h1>Th???ng K??</h1>
        <div>
          <a
            onClick={() => {
              setIsOpen(true);
            }}
            className="header__statistic-link"
            href="#"
          >
            <FiUserPlus className="icon-user" />
          </a>
          <Link to="/" className="header__statistic-link" href="#">
            <IoLogOut className="icon-log-out" />
          </Link>
        </div>
      </div>
      <div className="header__route">
        <a
          onClick={() => {
            if (!loading) {
              dispatch({ type: 'GET_USERS' });
              dispatch({ type: 'RE_RENDER' });
              dispatch({ type: 'LOADING' });
              return;
            }
          }}
          className="header__route-flex"
        >
          <TiGroup className="header__route-flex-icon users" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              S??? l?????ng ng?????i d??ng
            </span>
            <span className="header__route-flex-text-number">
              {!loading ? users : <Loading height={20} width={20} />}
            </span>
          </div>
        </a>
        <a
          onClick={() => {
            if (!loading) {
              dispatch({ type: 'GET_POSTS' });
              dispatch({ type: 'RE_RENDER' });
              dispatch({ type: 'LOADING' });
              return;
            }
          }}
          className="header__route-flex"
        >
          <IoDocuments className="header__route-flex-icon posts" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              S??? l?????ng b??i vi???t
            </span>
            <span className="header__route-flex-text-number">
              {!loading ? postes : <Loading height={20} width={20} />}
            </span>
          </div>
        </a>
        <a
          onClick={() => {
            if (!loading) {
              dispatch({ type: 'GET_POSTS_REPORTED' });
              dispatch({ type: 'RE_RENDER' });
              dispatch({ type: 'LOADING' });
              return;
            }
          }}
          className="header__route-flex"
        >
          <GoReport className="header__route-flex-icon user-report" />
          <div className="header__route-flex-text">
            <span lassName="header__route-flex-text-title">
              B??i vi???t b??? b??o c??o
            </span>
            <span className="header__route-flex-text-number">
              {!loading ? report : <Loading height={20} width={20} />}
            </span>
          </div>
        </a>
        <a className="header__route-flex">
          <FaUserTimes className="header__route-flex-icon post-report" />
          <div className="header__route-flex-text">
            <span className="header__route-flex-text-title">
              T???ng ph??ng chat
            </span>
            <span className="header__route-flex-text-number">
              {!loading ? rooms : <Loading height={20} width={20} />}
            </span>
          </div>
        </a>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-admin">
          <form onSubmit={handleUpdate} className="form">
            <h1>Update info</h1>

            <div className="update-password">
              <label for="account">New Password</label>
              <input
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="password"
                id="account"
                name="firstname"
                placeholder="Enter your new password"
              ></input>
            </div>
            <div className="cover-submit">
              <button type="submit" className="link-submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
