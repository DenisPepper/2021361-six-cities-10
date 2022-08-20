import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  AuthorizationStatus,
  ServerRoutes,
  TIME_OUT_SHOW_ERROR,
} from '../settings';
import { OfferType } from '../types/offer-type';
import { CommentType } from '../types/comment-type';
import { AppDispatchType, StateType } from '../types/state-type';
import {
  setOffers,
  setAuthorizationStatus,
  setError,
  setLoadingStatus,
  loggedIn,
  offerLoaded,
  offerNotLoaded,
} from './action-creaters';
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
    try {
      const { data } = await HTTPClient.get<OfferType[]>(ServerRoutes.hotels);
      dispatch(setOffers(data));
    } catch (error) {
      dispatch(setLoadingStatus(false));
    }
  }
);

export const getOffer = createAsyncThunk<void, number, AsyncThunkType>(
  'GET_OFFER',
  async (id, { dispatch, extra: HTTPClient }) => {
    try {
      const { data: room } = await HTTPClient.get<OfferType>(
        `${ServerRoutes.hotels}/${id}`
      );
      const { data: nearOffers } = await HTTPClient.get<OfferType[]>(
        `${ServerRoutes.hotels}/${id}/nearby`
      );
      const { data: comments } = await HTTPClient.get<CommentType[]>(
        `${ServerRoutes.comments}/${id}`
      );
      dispatch(offerLoaded({ room, nearOffers, comments }));
    } catch (error) {
      dispatch(offerNotLoaded());
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
      data: { token, email: userEmail },
    } = await HTTPClient.post<UserData>(ServerRoutes.login, {
      email,
      password,
    });
    saveToken(token);
    dispatch(loggedIn(userEmail));
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
