import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EpisodeItems, Home} from '../../types/home';
import {getEpisodes} from '../actions/HomeActions';

export const HomeInitialState: Home = {
  EpisodeList: [],
  EpisodesLoading: false,
};

export const HomeSlice = createSlice({
  name: 'home',
  initialState: HomeInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEpisodes.pending, (state, {payload}) => {
      state.EpisodesLoading = true;
    });
    builder.addCase(
      getEpisodes.fulfilled,
      (
        state: {
          EpisodeList: Array<EpisodeItems> | null;
          EpisodesLoading: boolean;
        },
        {payload}: PayloadAction<Array<EpisodeItems>>,
      ) => {
        state.EpisodesLoading = false;
        state.EpisodeList = payload;
      },
    );
    builder.addCase(getEpisodes.rejected, (state, {payload}) => {
      state.EpisodesLoading = false;
    });
  },
});

export const {} = HomeSlice.actions;
