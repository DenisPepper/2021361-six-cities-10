import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../settings';
import { OfferType } from '../../../types/offer-type';
import {
  getFavorites,
  changeFavoriteStatus,
} from '../../action-creaters-middleware';

type StateType = {
  favoriteOffers: OfferType[];
  favoritesCounter: number;
};

const initialState: StateType = {
  favoriteOffers: [],
  favoritesCounter: 0,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.favoritesCounter = action.payload.length;
      })

      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const offer = action.payload.offer;
        const updatedOffers = action.payload.increment ? [...state.favoriteOffers, offer] : state.favoriteOffers.filter((element) => element.id !== offer.id);
        state.favoriteOffers = updatedOffers;
        state.favoritesCounter = updatedOffers.length;

      });
  },
});
