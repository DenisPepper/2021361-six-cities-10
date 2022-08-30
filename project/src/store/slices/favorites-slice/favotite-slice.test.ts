import { favoriteSlice } from './favotite-slice';
import { OfferType } from '../../../types/offer-type';
import {
  getFavorites,
  changeFavoriteStatus,
} from '../../action-creaters-middleware';

const reducer = favoriteSlice.reducer;

const unknowCase = { type: 'UNKNOW_CASE' };

type StateType = {
  favoriteOffers: OfferType[];
  favoritesCounter: number;
};

const defaultStore: StateType = {
  favoriteOffers: [],
  favoritesCounter: 0,
};

const offer = {
  bedrooms: 3,
  city: {
    location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 },
    name: 'Amsterdam',
  },
  description:
    'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating'],
  host: { avatarUrl: 'img/1.png', id: 3, isPro: true, name: 'Angelina' },
  id: 1,
  images: ['img/1.png'],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  maxAdults: 4,
  previewImage: 'img/1.png',
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

const favoriteOffers = [offer];

describe('favorite-slice reducer', () => {
  it('when default case', () =>
    expect(reducer(undefined, unknowCase)).toEqual(defaultStore));

  it('when get favorites is success', () =>
    expect(
      reducer(defaultStore, {
        type: getFavorites.fulfilled.type,
        payload: favoriteOffers,
      })
    ).toEqual({ favoriteOffers, favoritesCounter: 1 }));

  it('when change favorite status is success then increment', () =>
    expect(
      reducer(defaultStore, {
        type: changeFavoriteStatus.fulfilled.type,
        payload: { offer, increment: true },
      })
    ).toEqual({ favoriteOffers, favoritesCounter: 1 }));

  it('when change favorite status is success then decrement', () =>
    expect(
      reducer({favoriteOffers, favoritesCounter: 1}, {
        type: changeFavoriteStatus.fulfilled.type,
        payload: { offer, increment: false },
      })
    ).toEqual({ favoriteOffers: [], favoritesCounter: 0 }));
});
