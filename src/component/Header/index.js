import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserTimes } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { IoDocuments, IoLogOut } from 'react-icons/io5';
import { TiGroup } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import {
	urlAdmin,
	urlAllRoom,
	urlCreateAdmin,
	urlPosts,
	urlPostsReported,
	urlUpdatePassword,
	urlUsers,
} from '../../constant';
import Loading from '../Loading';
import './style.scss';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
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
	const user = useSelector((state) => state.user);
	console.log('🚀 ~ file: index.js ~ line 51 ~ Header ~ user', user.position);

	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalIsOpen2, setIsOpen2] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [accountName, setAccountName] = useState('');
	const [accountPass, setAccountPass] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [error, setError] = useState('');
	const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
	const [position, setPosition] = useState(null);
	function afterOpenModal(e) {
		// references are now sync'd and can be accessed.
	}
	const handleChangeValue = (e) => {
		// console.log(e.target.value);
		setPosition(e);
	};
	function closeModal() {
		setIsOpen(false);
	}
	function closeModal2() {
		setIsOpen2(false);
	}
	const options = [
		{ value: 'admin-report', label: 'Admin report' },
		{ value: 'admin-user', label: 'Admin User' },
		{ value: 'admin-post', label: 'Admin Post' },
	];
	const handleUpdate = async (e) => {
		try {
			e.preventDefault();
			if (accountName && accountPass && position.value) {
				console.log({ accountName, accountPass, position });
				const response2 = await axios.post(urlCreateAdmin, {
					account: accountName,
					password: accountPass,
					position: position.value,
				});
				console.log(response2.data);
				if (response2.data !== 'dont have user') {
					alert('Create admin successfully');
				} else {
					alert('This account has been created');
				}
				closeModal2(true);
				return;
			}
		} catch (e) {
			console.log(e.message);
		}
	};
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		const account = user.name;
		const response = await axios.post(urlAdmin, {
			account,
			password: currentPassword,
		});
		if (response.data === 'Dont have admin') {
			setErrorCurrentPassword('Current password incorrect !');
			return;
		}
		if (newPassword !== confirmNewPassword) {
			setError('New password not match');
			return;
		}
		const response2 = await axios.post(urlUpdatePassword, {
			account: user.name,
			password: newPassword,
		});

		history.push('/');
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
				<h1>Statistic</h1>
				<div>
					<a
						onClick={() => {
							setIsOpen(true);
						}}
						className="header__statistic-link"
						href="#"
					>
						<CgProfile className="icon-user" />
					</a>
					<a
						onClick={() => {
							setIsOpen2(true);
						}}
						className="header__statistic-link"
						href="#"
					>
						<FiUserPlus className="icon-user" />
					</a>

					<Link
						onClick={() => {
							dispatch({ type: 'LOGOUT' });
						}}
						to="/"
						className="header__statistic-link"
						href="#"
					>
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
							Number of Users
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
							Number of posts
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
						<span lassName="header__route-flex-text-title">Reported posts</span>
						<span className="header__route-flex-text-number">
							{!loading ? report : <Loading height={20} width={20} />}
						</span>
					</div>
				</a>
				<a className="header__route-flex">
					<FaUserTimes className="header__route-flex-icon post-report" />
					<div className="header__route-flex-text">
						<span className="header__route-flex-text-title">
							Total Room Chat
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
					<form onSubmit={handleUpdateProfile} className="form">
						<h1>Update info</h1>

						<div className="update-password">
							<label for="account">Current password</label>
							<input
								onChange={(e) => {
									setCurrentPassword(e.target.value);
								}}
								type="password"
								id="account"
								name="firstname"
								placeholder="Enter your new password"
							></input>
							<span style={{ color: 'red' }}>{errorCurrentPassword}</span>
						</div>
						{user.position !== 'admin' ? (
							<div></div>
						) : (
							<div>
								<div className="update-password">
									<label for="account">New password</label>
									<input
										onChange={(e) => {
											setNewPassword(e.target.value);
										}}
										type="password"
										id="account"
										placeholder="Enter account name  "
									></input>
								</div>
								<div className="update-password">
									<label for="account">Confirm new password</label>
									<input
										onChange={(e) => {
											setConfirmNewPassword(e.target.value);
										}}
										type="password"
										id="account"
										placeholder="Enter password name "
									></input>
									<span style={{ color: 'red' }}>{error}</span>
								</div>
								{/* <select
									id="mySelect"
									value={position}
									onChange={handleChangeValue}
								>
									<option value="" disabled>
										Defaul
									</option>
									<option value="admin-report">admin-report</option>
									<option value="admin-post">admin-post</option>
									<option value="admin-user">admin-user</option>
								</select> */}
							</div>
						)}
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
			<Modal
				isOpen={modalIsOpen2}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal2}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="modal-admin">
					<form onSubmit={handleUpdate} className="form">
						<h1>Create admin</h1>

						{user.position !== 'admin' ? (
							<div></div>
						) : (
							<div>
								<div className="update-password">
									<label for="account">Name</label>
									<input
										onChange={(e) => {
											setAccountName(e.target.value);
										}}
										type=""
										id="account"
										placeholder="Enter account name  "
									></input>
								</div>
								<div className="update-password">
									<label for="account">Password</label>
									<input
										onChange={(e) => {
											setAccountPass(e.target.value);
										}}
										type=""
										id="account"
										placeholder="Enter password name "
									></input>
								</div>
								{/* <select
									id="mySelect"
									value={position}
									onChange={handleChangeValue}
								>
									<option value="" disabled>
										Select
									</option>
									<option value="admin-report">admin-report</option>
									<option value="admin-post">admin-post</option>
									<option value="admin-user">admin-user</option>
								</select> */}
								<div className="select-item">
									<div className="item">
										<Select
											value={position}
											onChange={handleChangeValue}
											options={options}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="cover-submit">
							<button type="submit" className="link-submit">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								Create
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
}
