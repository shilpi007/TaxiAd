import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import { reducer as formReducer } from 'redux-form';
import loaderReducer from './loaderReducer';
export default combineReducers({
  form: formReducer,
  admin: adminReducer,
  loading: loaderReducer
});
