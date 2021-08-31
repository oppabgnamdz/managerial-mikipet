const initUser = {
	token: undefined,
	name: '',
	position: undefined,
	refreshToken: undefined,
};

export default function User(state = initUser, action) {
	switch (action.type) {
		case 'LOGIN': {
			return { ...action.payload };
		}
		case 'LOGOUT': {
			return initUser;
		}
		default:
			return state;
	}
}
