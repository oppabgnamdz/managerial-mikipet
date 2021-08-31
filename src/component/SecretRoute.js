import { authentication } from '../auth';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export function SecuredRoute(props) {
	const user = useSelector((state) => state.user);

	return (
		<Route
			path={props.path}
			render={(data) =>
				authentication.getLogInStatus() || user.token ? (
					<props.component {...data}></props.component>
				) : (
					<Redirect to={{ pathname: '/' }}></Redirect>
				)
			}
		></Route>
	);
}
