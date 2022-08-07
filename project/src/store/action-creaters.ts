import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction('CHANGE_CITY', (payload: string) => ({
  payload,
}));

export const setOffers = createAction('SET_OFFERS', (payload: OfferType[]) => ({
  payload,
}));

export const setCurrentID = createAction('SET_CURRENT_ID', (payload: number) => ({
  payload,
}));
