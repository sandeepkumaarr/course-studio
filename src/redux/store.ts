import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {HomeSlice} from './reducers/HomeReducer';

const reducer = combineReducers({
  Home: HomeSlice.reducer,
});

export default configureStore({
  reducer,
  devTools: true,
});
