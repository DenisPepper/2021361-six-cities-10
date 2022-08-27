import { OfferTypeToSort } from './types/offer-type';

export const DECIMAL = 10;

const FULL_PERCENT = 100;
const FULL_STARS = 5;
export const RATING_COEF = FULL_PERCENT / FULL_STARS;

export const TIME_OUT_SHOW_ERROR = 5000;

export const DEFAULT_DELAY = 1000;

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

export enum NameSpace {
  Auth = 'AUTH',
  Current = 'CURRENT',
  Error = 'ERROR',
  Favorites = 'FAVORITES',
  Offers = 'OFFERS'
}

export const BASE_URL = 'https://10.react.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const ServerRoutes = {
  hotels: '/hotels',
  login: '/login',
  logout: '/logout',
  comments: '/comments',
  favorite: '/favorite',
};

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

export const SORTS: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

type Comparator = (a: OfferTypeToSort, b: OfferTypeToSort) => number;

export const SortsRules: Record<string, Comparator> = {
  Popular: (a: OfferTypeToSort, b: OfferTypeToSort) => a.id - b.id,
  'Price: low to high': (a: OfferTypeToSort, b: OfferTypeToSort) =>
    a.price - b.price,
  'Price: high to low': (a: OfferTypeToSort, b: OfferTypeToSort) =>
    b.price - a.price,
  'Top rated first': (a: OfferTypeToSort, b: OfferTypeToSort) =>
    b.rating - a.rating,
};

export const DEFAULT_SORT = SORTS[0];
