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
}
