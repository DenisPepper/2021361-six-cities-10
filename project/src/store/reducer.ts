import { createReducer } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
//import { offers } from '../mocks/offers';
import { changeCity, setOffers, setCurrentID, setError } from './action-creaters';
import { DEFAULT_CITY, AuthorizationStatus } from '../settings';

type StateType = {
  city: string;
  offers: OfferType[];
  currentID: number;
  AuthorizationStatus: string;
  error: string | null;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: [],
  currentID: NaN,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });

  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });

  builder.addCase(setCurrentID, (state, action) => {
    state.currentID = action.payload;
  });

  builder.addCase(setError, (state, action) => {
    state.error = action.payload;
  });

});
