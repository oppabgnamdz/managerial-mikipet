import { urlRefreshTokenAdmin } from './constant';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
export default function setupAxios(axios, store) {
	console.log('interceptor');
	console.log({ store: store.getState().user.token });
	axios.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			config.headers.Authorization = 'Bearer ' + store.getState().user.token;
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		async function (error) {
			const {
				config,
				response: { status },
			} = error;
			const data = await axios.post(urlRefreshTokenAdmin, {
				refreshToken: store.getState().user.refreshToken,
			});
			console.log('error request');
			console.log({ config }, { status }, { data: data.data });
			store.dispatch({
				type: 'LOGIN',
				payload: {
					token: data.data.token,
					refreshToken: data.data.refreshToken,
				},
			});
			config.headers.Authorization = 'Bearer ' + store.getState().user.token;
			return axios(config);
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			// return Promise.reject(error);
		}
	);
}
