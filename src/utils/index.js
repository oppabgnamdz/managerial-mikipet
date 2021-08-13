import axios from 'axios';
import { urlUsers } from '../constant';

export const Paging = async (page, urlFetch) => {
	try {
		console.log('abc', page, urlFetch);
		if (urlFetch !== urlUsers) {
			const response = await axios.get(`${urlFetch}/${page}`);
			console.log(response.data);
			return response.data;
		} else {
			const response = await axios.get(`${urlFetch}/${page}/pages`);
			console.log(response.data);
			return response.data;
		}
	} catch (e) {
		console.log(e.message);
	}
};
