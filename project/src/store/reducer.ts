import { createReducer } from '@reduxjs/toolkit';
import { OfferType, OfferTypeFullData } from '../types/offer-type';
import {
  changeCity,
  setOffers,
  setCurrentSort,
  setCurrentID,
  setError,
  setLoadingStatus,
  setAuthorizationStatus,
  loggedIn,
  offerLoaded
} from './action-creaters';
import { DEFAULT_CITY, DEFAULT_SORT, AuthorizationStatus } from '../settings';

type StateType = {
  city: string;
  offer: OfferTypeFullData | null;
  offers: OfferType[];
  currentID: number;
  currentSort: string;
  authorizationStatus: string;
  error: string | null;
  offersLoaded: boolean;
  userName: string;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offer: null,
  offers: [],
  currentID: NaN,
  currentSort: DEFAULT_SORT,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  offersLoaded: false,
  userName: '',
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

  builder.addCase(setAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
  });

  builder.addCase(loggedIn, (state, action) => {
    state.authorizationStatus = AuthorizationStatus.Yes;
    state.userName = action.payload;
  });

  builder.addCase(offerLoaded, (state, action) => {
    state.offer = action.payload;
  });

});
