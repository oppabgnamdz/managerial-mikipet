import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { PersistGate } from 'redux-persist/lib/integration/react';
// const store = createStore(reducers);
import { persistor, store } from './store';
import axios from 'axios';
import setupAxios from './setupAxios';
import { urlRefreshTokenAdmin } from './constant';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
setupAxios(axios, store);

// const refreshAuthLogic = (failedRequest) => {
// 	console.log('abc');
// 	axios.post(urlRefreshTokenAdmin).then((tokenRefreshResponse) => {
// 		console.log({ tokenRefreshResponse });
// 		store.dispatch({
// 			type: 'LOGIN',
// 			payload: {
// 				token: tokenRefreshResponse.data.token,
// 				refreshToken: tokenRefreshResponse.data.refreshToken,
// 			},
// 		});
// 		failedRequest.response.config.headers['Authorization'] =
// 			'Bearer ' + tokenRefreshResponse.data.token;
// 		return Promise.resolve();
// 	});
// };
// createAuthRefreshInterceptor(axios, refreshAuthLogic);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
