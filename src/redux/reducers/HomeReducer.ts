import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Home} from '../../types/home';

export const HomeInitialState: Home = {
  MusicList: [],
};

export const HomeSlice = createSlice({
  name: 'home',
  initialState: HomeInitialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = HomeSlice.actions;
