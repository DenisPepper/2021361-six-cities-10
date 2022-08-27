import { createAction } from '@reduxjs/toolkit';
import { OfferType, OfferTypeFullData } from '../types/offer-type';
import { CommentType } from '../types/comment-type';

export const incrementFavoritesOffers = createAction<OfferType>(
  'INCREMENT_FAVORITES_OFFERS'
);

export const decrementFavoritesOffers = createAction<OfferType>(
  'DECREMENT_FAVORITES_OFFERS'
);

export const favoritesLoaded = createAction<OfferType[]>('FAVORITES_LOADED');

export const commentsLoaded = createAction<CommentType[]>('COMMENTS_LOADED');

export const setCurrentCity = createAction(
  'CHANGE_CITY',
  (payload: string) => ({
    payload,
  })
);

export const setOffers = createAction('SET_OFFERS', (payload: OfferType[]) => ({
  payload,
}));

export const offerLoaded = createAction(
  'OFFER_LOADED',
  (payload: OfferTypeFullData) => ({
    payload,
  })
);

export const offerNotLoaded = createAction('OFFER_NOT_LOADED');

export const spinnerEnabled = createAction('SPINNER_ENABLED');

export const setCurrentSort = createAction(
  'SET_CURRENT_SORT',
  (payload: string) => ({
    payload,
  })
);

export const setCurrentID = createAction(
  'SET_CURRENT_ID',
  (payload: number) => ({
    payload,
  })
);

export const setAuthorizationStatus = createAction(
  'SET_AUTH_STATUS',
  (payload: string) => ({
    payload,
  })
);

export const setError = createAction('SET_ERROR', (payload: string | null) => ({
  payload,
}));

export const setLoadingStatus = createAction(
  'SET_LOADING_STATUS',
  (payload: boolean) => ({
    payload,
  })
);

export const loggedIn = createAction('LOGGED_IN', (payload: string) => ({
  payload,
}));
