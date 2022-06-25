import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {HomeSlice} from './reducers/HomeReducer';
import {UserSlice} from './reducers/userReducer';

const reducer = combineReducers({
  Home: HomeSlice.reducer,
  User: UserSlice.reducer,
});

export default configureStore({
  reducer,
  devTools: true,
});
