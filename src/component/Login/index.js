import axios from 'axios';
import React, { useRef, useState } from 'react';
import NotificationAlert from 'react-notification-alert';
import 'react-notification-alert/dist/animate.css';
import { useHistory } from 'react-router-dom';
import { authentication } from '../../auth';
import { urlAdmin } from '../../constant';
import './style.scss';
let config = {
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	},
};
const options = {
	place: 'tr',
	message: (
		<div>
			<div>Your account invalid</div>
		</div>
	),
	type: 'dark',
	icon: 'now-ui-icons ui-1_bell-53',
	autoDismiss: 7,
};
export default function Index() {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	const notification = useRef(null);
	const history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post(urlAdmin, {
			account,
			password,
		});
		console.log(response.data);
		if (response.data === 'Dont have admin') {
			notification.current.notificationAlert(options);
			return;
		}
		localStorage.setItem('token', response.data.token);
		localStorage.setItem('name', account);
		console.log(response.data.position);
		if (!response.data.position) {
			localStorage.setItem('position', 'admin');
		} else {
			localStorage.setItem('position', response.data.position);
		}
		authentication.onAuthentication();

		axios.interceptors.request.use(
			function (config) {
				// Do something before request is sent
				config.headers.Authorization =
					'Bearer ' + localStorage.getItem('token');
				return config;
			},
			function (error) {
				// Do something with request error
				return Promise.reject(error);
			}
		);

		history.push('/home');
		setAccount('');
		setPassword('');
	};
	return (
		<div className="login-page">
			<NotificationAlert ref={notification} zIndex={9999} onClick={() => {}} />
			<form onSubmit={handleSubmit} className="form">
				<h1>Log in</h1>
				<div className="login-account">
					<label for="account">Account</label>
					<input
						onChange={(e) => {
							setAccount(e.target.value);
						}}
						type="text"
						id="account"
						name="firstname"
						placeholder="Enter your account"
					></input>
				</div>
				<div className="login-password">
					<label for="account">Password</label>
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						id="account"
						name="firstname"
						placeholder="Enter your password"
					></input>
				</div>
				<div className="cover-submit">
					<button type="submit" className="link-submit">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
}
