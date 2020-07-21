import {combineReducers} from 'redux';
import {userApi} from '../screens/auth/reducers';
const AppReducer = combineReducers({
  userApi,
});

export default AppReducer;
