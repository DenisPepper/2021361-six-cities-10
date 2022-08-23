import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  AuthorizationStatus,
  ServerRoutes,
  TIME_OUT_SHOW_ERROR,
} from '../settings';
import { OfferType, OfferTypePostFavorite } from '../types/offer-type';
import { CommentType, NewCommentType } from '../types/comment-type';
import { AppDispatchType, StateType } from '../types/state-type';
import {
  setOffers,
  setAuthorizationStatus,
  setError,
  setLoadingStatus,
  loggedIn,
  offerLoaded,
  offerNotLoaded,
  commentsLoaded,
  favoritesLoaded,
  incrementFavoritesOffers,
  decrementFavoritesOffers
} from './action-creaters';
import { AuthData, UserData } from '../types/user-auth-types';
import { dropToken, saveToken } from '../services/token';

type AsyncThunkType = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};

export const setComment = createAsyncThunk<
  void,
  NewCommentType,
  AsyncThunkType
>('SET_COMMENT', async ({ id, comment }, { dispatch, extra: HTTPClient }) => {
  try {
    const { data } = await HTTPClient.post<CommentType[]>(
      `${ServerRoutes.comments}/${id}`,
      comment
    );
    dispatch(commentsLoaded(data));
  } catch (error) {
    // dispatch();
  }
});

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

export const clearError = createAsyncThunk<void, undefined, AsyncThunkType>(
  'CLEAR_ERROR',
  (_args, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), TIME_OUT_SHOW_ERROR);
  }
);

export const getFavorites = createAsyncThunk<void, undefined, AsyncThunkType>(
  'GET_FAVORITES',
  async (_args, { dispatch, extra: HTTPClient }) => {
    const { data } = await HTTPClient.get<OfferType[]>(ServerRoutes.favorite);
    dispatch(favoritesLoaded(data));
  }
);

export const changeFavoriteStatus = createAsyncThunk<
  void,
  OfferTypePostFavorite,
  AsyncThunkType
>(
  'CHANGE_FAVORITE_STATUS',
  async ({ id, isFavorite }, { dispatch, extra: HTTPClient }) => {
    try {
      const { data } = await HTTPClient.post<OfferType>(`${ServerRoutes.favorite}/${id}/${Number(isFavorite)}`);
      Number(isFavorite) === 0 ? dispatch(decrementFavoritesOffers(data)) : dispatch(incrementFavoritesOffers(data));
    } catch (error) {
      // dispatch();
    }
  }
);
