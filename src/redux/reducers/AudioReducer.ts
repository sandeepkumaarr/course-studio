import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Audio} from '../../types/audio';

export const AudioInitialState: Audio = {
  url: '',
  title: '',
  currentPlayingCardId: 0,
  showMiniPlayer: false,
  maxPlayerSize: ['1%', '2%'],
};

export const AudioSlice = createSlice({
  name: 'audio',
  initialState: AudioInitialState,
  reducers: {
    setMiniPlayerDetails: (
      state: {
        url: string | number | null | undefined;
        title: string | undefined;
        showMiniPlayer: boolean | undefined;
        currentPlayingCardId: number | undefined;
      },
      {payload}: PayloadAction<Audio | null>,
    ) => {
      state.url = payload?.url;
      state.title = payload?.title;
      state.showMiniPlayer = payload?.showMiniPlayer;
      state.currentPlayingCardId = payload?.currentPlayingCardId;
    },
    setMaxPlayerSize: (
      state: {
        maxPlayerSize: Array<string>;
      },
      {payload}: PayloadAction<Array<string>>,
    ) => {
      state.maxPlayerSize = payload;
    },
  },
  extraReducers: builder => {},
});

export const {
  setMiniPlayerDetails: setMiniPlayerDetailsActionCreator,
  setMaxPlayerSize: setMaxPlayerSizeActionCreator,
} = AudioSlice.actions;
