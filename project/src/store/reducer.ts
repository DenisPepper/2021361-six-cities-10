import { createReducer } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import {
  changeCity,
  setOffers,
  setCurrentSort,
  setCurrentID,
  setError,
  setLoadingStatus,
  setAuthorizationStatus,
  loggedIn,
  offerLoaded,
  offerNotLoaded,
  spinnerEnabled,
  commentsLoaded,
  favoritesLoaded
} from './action-creaters';
import { DEFAULT_CITY, DEFAULT_SORT, AuthorizationStatus } from '../settings';
import { CommentType } from '../types/comment-type';

type StateType = {
  city: string;
  room: OfferType | null;
  offers: OfferType[];
  nearOffers: OfferType[];
  favoriteOffers: OfferType[];
  favoritesCounter: number;
  comments: CommentType[];
  currentID: number;
  currentSort: string;
  authorizationStatus: string;
  error: string | null;
  offersLoaded: boolean;
  spinnerDisabled: boolean;
  userName: string;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  room: null,
  offers: [],
  nearOffers: [],
  favoriteOffers: [],
  favoritesCounter: 0,
  comments: [],
  currentID: NaN,
  currentSort: DEFAULT_SORT,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  offersLoaded: false,
  spinnerDisabled: false,
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
    state.room = action.payload.room;
    state.nearOffers = action.payload.nearOffers;
    state.comments = action.payload.comments;
    state.spinnerDisabled = true;
  });

  builder.addCase(offerNotLoaded, (state) => {
    state.room = null;
    state.nearOffers = [];
    state.comments = [];
    state.spinnerDisabled = true;
  });

  builder.addCase(spinnerEnabled, (state) => {
    state.spinnerDisabled = false;
  });

  builder.addCase(commentsLoaded, (state, action) => {
    state.comments = action.payload;
  });

  builder.addCase(favoritesLoaded, (state, action) => {
    state.favoriteOffers = action.payload;
    state.favoritesCounter = action.payload.length;
  });
});
