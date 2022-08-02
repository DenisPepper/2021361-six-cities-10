import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import {MapSettings} from '../types/map-types';

export const changeCity = createAction('CHANGE_CITY', (payload: string) => ({payload}));

export const setOffers = createAction('SET_OFFERS', (payload: OfferType[]) => ({payload}));

export const setMapSettings = createAction('SET_MAP_SETTINGS', (payload: MapSettings) => ({payload}));
