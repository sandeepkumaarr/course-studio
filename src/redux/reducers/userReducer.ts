import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, userDetails} from '../../types/user';

export const UserInitialState: User = {
  userDetails: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setUserDetails: (
      state: {userDetails: userDetails | null},
      {payload}: PayloadAction<userDetails | null>,
    ) => {
      state.userDetails = payload;
    },
  },
  extraReducers: builder => {},
});

export const {setUserDetails: setUserDetailsActionCreator} = UserSlice.actions;
