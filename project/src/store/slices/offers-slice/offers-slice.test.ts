import { offersSlice } from './offers-slice';
import { OfferType } from '../../../types/offer-type';
import {
  getOffers,
  getOffer,
  changeFavoriteStatus,
} from '../../action-creaters-middleware';

const reducer = offersSlice.reducer;

const unknowCase = { type: 'UNKNOW_CASE' };

type StateType = {
  room: OfferType | null;
  offers: OfferType[];
  nearOffers: OfferType[];
  offersLoaded: boolean;
};

const defaultStore: StateType = {
  room: null,
  offers: [],
  nearOffers: [],
  offersLoaded: false,
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

const sameOffer = {
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

const offers = [offer];

describe('offers-slice reducer', () => {
  it('when default case', () =>
    expect(reducer(undefined, unknowCase)).toEqual(defaultStore));

  it('when get offers is success', () =>
    expect(
      reducer(defaultStore, { type: getOffers.fulfilled.type, payload: offers })
    ).toEqual({ ...defaultStore, offers, offersLoaded: true }));

  it('when get offers is fail', () =>
    expect(reducer(defaultStore, { type: getOffers.rejected.type })).toEqual(
      defaultStore
    ));

  it('when get offer is success', () =>
    expect(
      reducer(defaultStore, {
        type: getOffer.fulfilled.type,
        payload: { room: offer, nearOffers: offers },
      })
    ).toEqual({ ...defaultStore, room: offer, nearOffers: offers }));

  it('when get offer is fail', () =>
    expect(
      reducer(
        { ...defaultStore, room: offer, nearOffers: offers },
        {
          type: getOffer.rejected.type,
        }
      )
    ).toEqual({ ...defaultStore, room: null, nearOffers: [] }));

  it('when change favorite status is success & room.id === offer.id then update offers & room', () =>
    expect(
      reducer(
        { ...defaultStore, offers, room: offer },
        {
          type: changeFavoriteStatus.fulfilled.type,
          payload: { offer: sameOffer },
        }
      )
    ).toEqual({ ...defaultStore, offers: [sameOffer], room: sameOffer }));

  it('when change favorite status is success & room === null then update offers', () =>
    expect(
      reducer(
        { ...defaultStore, offers },
        {
          type: changeFavoriteStatus.fulfilled.type,
          payload: { offer: sameOffer },
        }
      )
    ).toEqual({ ...defaultStore, offers: [sameOffer] }));
});
