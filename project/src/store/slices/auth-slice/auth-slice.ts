import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../settings';
import {
  checkAuthorizationStatus,
  login,
  logout,
} from '../../action-creaters-middleware';

type StateType = {
  authorizationStatus: string;
  userName: string;
};

const initialState: StateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: '',
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorizationStatus.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Yes;
      })

      .addCase(checkAuthorizationStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.No;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Yes;
        state.userName = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.No;
        state.userName = '';
      });
  },
});
