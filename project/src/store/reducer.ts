import { createReducer } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { offers } from '../mocks/offers';
import { changeCity, setOffers } from './action-creaters';
import { DEFAULT_CITY } from '../const';

type StateType = {
  city: string;
  offers: OfferType[];
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: offers,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });

  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });
});
