import './App.css';
import Header from './component/Header';
import Navigation from './component/Navigation';
import Login from './component/Login';
import Home from './component/Home';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import { SecuredRoute } from './component/SecretRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function App() {
	const user = useSelector((state) => state.user);
	console.log({ user });
	return (
		<Router>
			<Switch>
				<SecuredRoute exact path="/home" component={Home}></SecuredRoute>
				<Route exact path="/">
					{user.name ? (
						<Redirect to={{ pathname: '/home' }}></Redirect>
					) : (
						<Login />
					)}
				</Route>
				<Route>
					<Redirect to={{ pathname: '/' }}></Redirect>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
