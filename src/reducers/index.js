import { combineReducers } from 'redux';
import goTable from './GoTable';
import reRender from './ReRender';
import loading from './Loading';
import user from './User';
export default combineReducers({
	goTable,
	reRender,
	loading,
	user,
});
