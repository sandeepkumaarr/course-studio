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
        let episodeList: Array<EpisodeItems> = [];
        let episodeCount = 0;

        Promise.all(
          payload.map(item => {
            episodeList.push({
              created_at: item.created_at,
              id: item.id,
              name: item.name,
              url: item.url,
              index: episodeCount,
            });
            episodeCount++;
          }),
        );

        state.EpisodesLoading = false;
        state.EpisodeList = episodeList;
      },
    );
    builder.addCase(getEpisodes.rejected, (state, {payload}) => {
      state.EpisodesLoading = false;
    });
  },
});

export const {} = HomeSlice.actions;
