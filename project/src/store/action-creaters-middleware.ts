import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  AuthorizationStatus,
  ServerRoutes,
  TIME_OUT_SHOW_ERROR,
} from '../settings';
import { OfferType } from '../types/offer-type';
import { AppDispatchType, StateType } from '../types/state-type';
import { setOffers, setAuthorizationStatus, setError, setLoadingStatus } from './action-creaters';
import { AuthData, UserData } from '../types/user-auth-types';
import { dropToken, saveToken } from '../services/token';

type AsyncThunkType = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};

export const getOffers = createAsyncThunk<void, undefined, AsyncThunkType>(
  'GET_OFFERS',
  async (_args, { dispatch, extra: HTTPClient }) => {
    const { data } = await HTTPClient.get<OfferType[]>(ServerRoutes.hotels);
    try {
      dispatch(setOffers(data));
    } catch (error) {
      dispatch(setLoadingStatus(false));
    }
  }
);

export const checkAuthorizationStatus = createAsyncThunk<
  void,
  undefined,
  AsyncThunkType
>('CHECK_AUTH', async (_args, { dispatch, extra: HTTPClient }) => {
  try {
    await HTTPClient.get<string>(ServerRoutes.login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Yes));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.No));
  }
});

export const login = createAsyncThunk<void, AuthData, AsyncThunkType>(
  'LOGIN',
  async ({ login: email, password }, { dispatch, extra: HTTPClient }) => {
    const {
      data: { token },
    } = await HTTPClient.post<UserData>(ServerRoutes.login, {
      email,
      password,
    });
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Yes));
  }
);

export const logout = createAsyncThunk<void, undefined, AsyncThunkType>(
  'LOGOUT',
  async (_args, { dispatch, extra: HTTPClient }) => {
    await HTTPClient.delete<UserData>(ServerRoutes.logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.No));
  }
);

export const clearError = createAsyncThunk(
  'CLEAR_ERROR',
  (_args, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), TIME_OUT_SHOW_ERROR);
  }
);
