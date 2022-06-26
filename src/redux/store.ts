import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {AudioSlice} from './reducers/AudioReducer';
import {HomeSlice} from './reducers/HomeReducer';
import {UserSlice} from './reducers/userReducer';

const reducer = combineReducers({
  Home: HomeSlice.reducer,
  User: UserSlice.reducer,
  Audio: AudioSlice.reducer,
});

export default configureStore({
  reducer,
  devTools: true,
});
