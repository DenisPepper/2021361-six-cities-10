import { createReducer } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import {offers} from '../mocks/offers';
import { changeCity, setOffers, setMapSettings } from './action-creaters';
import { DEFAULT_CITY, DEFAULT_MAP_SETTINGS } from '../const';
import {MapSettings} from '../types/map-types';

type StateType = {
  city: string,
  mapSettings: MapSettings,
  offers: OfferType[],
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  mapSettings: DEFAULT_MAP_SETTINGS,
  offers: offers,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });

  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });

  builder.addCase(setMapSettings, (state, action) => {
    state.mapSettings = action.payload;
  });
});
