import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';

export const getEpisodes = createAsyncThunk(
  'home/episodes',
  async (data: {}, {rejectWithValue}) => {
    try {
      let {data: Response} = await api.fetchAuthGet('/podcasts');

      return Response;
    } catch (err) {
      return rejectWithValue('Unable to fetch equipment data');
    }
  },
);
