import { createReducer } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { offers } from '../mocks/offers';
import { changeCity, setOffers, setCurrentID } from './action-creaters';
import { DEFAULT_CITY } from '../settings';

type StateType = {
  city: string;
  offers: OfferType[];
  currentID: number;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: offers,
  currentID: NaN,
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
});
