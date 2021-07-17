import { combineReducers } from 'redux';
import goTable from './GoTable';
import reRender from './ReRender';
import loading from './Loading';
export default combineReducers({
  goTable,
  reRender,
  loading,
});
