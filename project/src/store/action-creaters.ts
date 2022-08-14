import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction('CHANGE_CITY', (payload: string) => ({
  payload,
}));

export const setOffers = createAction('SET_OFFERS', (payload: OfferType[]) => ({
  payload,
}));

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
