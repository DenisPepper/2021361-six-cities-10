import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../settings';
import { OfferType } from '../../../types/offer-type';
import {
  getOffers,
  getOffer,
  changeFavoriteStatus,
} from '../../action-creaters-middleware';

type StateType = {
  room: OfferType | null;
  offers: OfferType[];
  nearOffers: OfferType[];
  offersLoaded: boolean;
};

const initialState: StateType = {
  room: null,
  offers: [],
  nearOffers: [],
  offersLoaded: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoaded = true;
      })

      .addCase(getOffers.rejected, (state) => {
        state.offers = [];
        state.offersLoaded = false;
      })

      .addCase(getOffer.fulfilled, (state, action) => {
        state.room = action.payload.room;
        state.nearOffers = action.payload.nearOffers;
      })

      .addCase(getOffer.rejected, (state) => {
        state.room = null;
        state.nearOffers = [];
      })

      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const offer = action.payload.offer;
        state.offers = state.offers.map((element) =>
          element.id === offer.id ? offer : element
        );
        if (state.room && state.room.id === offer.id) {
          state.room = offer;
        }
      });
  },
});
