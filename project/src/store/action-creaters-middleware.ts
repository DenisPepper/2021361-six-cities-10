import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ServerRoutes, TIME_OUT_SHOW_ERROR } from '../settings';
import {
  OfferType,
  OfferTypeFullData,
  OfferTypePostFavorite,
  OfferTypeChangeFavorite,
} from '../types/offer-type';
import { CommentType, NewCommentType } from '../types/comment-type';
import { AppDispatchType, StateType } from '../types/state-type';
import { AuthData, UserData, UserInfoData } from '../types/user-auth-types';
import { dropToken, saveToken } from '../services/token';
import { setError } from './slices/error-slice/error-slice';

type AsyncThunkType = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};

export const setComment = createAsyncThunk<
  CommentType[],
  NewCommentType,
  AsyncThunkType
>('SET_COMMENT', async ({ id, comment, form }, { extra: HTTPClient }) => {
  const { data } = await HTTPClient.post<CommentType[]>(
    `${ServerRoutes.comments}/${id}`,
    comment
  );
  if (data) {
    form.reset();
  }
  return data;
});

export const getOffers = createAsyncThunk<
  OfferType[],
  undefined,
  AsyncThunkType
>('GET_OFFERS', async (_args, { extra: HTTPClient }) => {
  const { data } = await HTTPClient.get<OfferType[]>(ServerRoutes.hotels);
  return data;
});

export const getOffer = createAsyncThunk<
  OfferTypeFullData,
  number,
  AsyncThunkType
>('GET_OFFER', async (id, { extra: HTTPClient }) => {
  const { data: room } = await HTTPClient.get<OfferType>(
    `${ServerRoutes.hotels}/${id}`
  );
  const { data: nearOffers } = await HTTPClient.get<OfferType[]>(
    `${ServerRoutes.hotels}/${id}/nearby`
  );
  const { data: comments } = await HTTPClient.get<CommentType[]>(
    `${ServerRoutes.comments}/${id}`
  );
  return { room, nearOffers, comments };
});

export const checkAuthorizationStatus = createAsyncThunk<
  UserInfoData,
  undefined,
  AsyncThunkType
>('CHECK_AUTH', async (_args, { extra: HTTPClient }) => {
  const { data } = await HTTPClient.get<UserInfoData>(ServerRoutes.login);
  return data;
});

export const login = createAsyncThunk<string, AuthData, AsyncThunkType>(
  'LOGIN',
  async ({ login: email, password }, { extra: HTTPClient }) => {
    const {
      data: { token, email: userEmail },
    } = await HTTPClient.post<UserData>(ServerRoutes.login, {
      email,
      password,
    });
    saveToken(token);
    return userEmail;
  }
);

export const logout = createAsyncThunk<void, undefined, AsyncThunkType>(
  'LOGOUT',
  async (_args, { extra: HTTPClient }) => {
    await HTTPClient.delete<UserData>(ServerRoutes.logout);
    dropToken();
  }
);

export const clearError = createAsyncThunk<void, undefined, AsyncThunkType>(
  'CLEAR_ERROR',
  (_args, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), TIME_OUT_SHOW_ERROR);
  }
);

export const getFavorites = createAsyncThunk<
  OfferType[],
  undefined,
  AsyncThunkType
>('GET_FAVORITES', async (_args, { extra: HTTPClient }) => {
  const { data } = await HTTPClient.get<OfferType[]>(ServerRoutes.favorite);
  return data;
});

export const changeFavoriteStatus = createAsyncThunk<
  OfferTypeChangeFavorite,
  OfferTypePostFavorite,
  AsyncThunkType
>(
  'CHANGE_FAVORITE_STATUS',
  async ({ id, isFavorite }, { extra: HTTPClient }) => {
    const { data } = await HTTPClient.post<OfferType>(
      `${ServerRoutes.favorite}/${id}/${Number(isFavorite)}`
    );
    return { offer: data, increment: isFavorite };
  }
);
