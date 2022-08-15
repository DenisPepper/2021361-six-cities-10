import { createReducer } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import {
  changeCity,
  setOffers,
  setCurrentSort,
  setCurrentID,
  setError,
  setLoadingStatus,
} from './action-creaters';
import { DEFAULT_CITY, DEFAULT_SORT, AuthorizationStatus } from '../settings';

type StateType = {
  city: string;
  offers: OfferType[];
  currentID: number;
  currentSort: string;
  AuthorizationStatus: string;
  error: string | null;
  offersLoaded: boolean;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: [],
  currentID: NaN,
  currentSort: DEFAULT_SORT,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  offersLoaded: false,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });

  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
    state.offersLoaded = true;
  });

  builder.addCase(setCurrentSort, (state, action) => {
    state.currentSort = action.payload;
  });

  builder.addCase(setCurrentID, (state, action) => {
    state.currentID = action.payload;
  });

  builder.addCase(setError, (state, action) => {
    state.error = action.payload;
  });

  builder.addCase(setLoadingStatus, (state, action) => {
    state.offersLoaded = action.payload;
  });
});
