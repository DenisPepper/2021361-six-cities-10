import { OfferType } from './types/offer-type';

export const converToPercent = (rating: number) => rating * 100 / 5;

export const filterOffersByCity = (city: string, offers:OfferType[]) => offers.filter((offer) => offer.city.name === city);

