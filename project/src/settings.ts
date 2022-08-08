import { OfferType } from './types/offer-type';

export enum AuthorizationStatus {
  Yes = 'YES',
  No = 'NO',
  Unknown = 'UNKNOWN',
}

export enum AppPath {
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  Page404 = '*',
  Offer = '/offer/',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const ICON_SIZE = 40;

export const CITIES: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_MAP_SETTINGS = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 13,
};


export const SortsName = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

export const SortsRules = {
  [SortsName.POPULAR]: (a: OfferType, b: OfferType) => a.id - b.id,
  [SortsName.PRICE_LOW_TO_HIGH]: (a: OfferType, b: OfferType) =>
    a.price - b.price,
  [SortsName.PRICE_HIGH_TO_LOW]: (a: OfferType, b: OfferType) =>
    b.price - a.price,
  [SortsName.TOP_RATED_FIRST]: (a: OfferType, b: OfferType) =>
    b.rating - a.rating,
};
