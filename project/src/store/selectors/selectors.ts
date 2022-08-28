import { NameSpace } from '../../settings';
import { StateType } from '../../types/state-type';

export const nearOffers = (store: StateType) =>
  store[NameSpace.Offers].nearOffers;

export const isOffersloaded = (store: StateType) =>
  store[NameSpace.Offers].offersLoaded;

export const currentCity = (store: StateType) =>
  store[NameSpace.Current].currentcity;

export const currentSort = (store: StateType) =>
  store[NameSpace.Current].currentSort;

export const currenRoomID = (store: StateType) =>
  store[NameSpace.Current].currentID;

export const actualRoom = (store: StateType) => store[NameSpace.Offers].room;

export const roomComments = (store: StateType) =>
  store[NameSpace.Comments].comments;

export const authStatus = (store: StateType) =>
  store[NameSpace.Auth].authorizationStatus;

export const appError = (store: StateType) => store[NameSpace.Error].error;

export const userNickname = (store: StateType) =>
  store[NameSpace.Auth].userName;

export const favCounter = (store: StateType) =>
  store[NameSpace.Favorites].favoritesCounter;

export const favOffers = (store: StateType) =>
  store[NameSpace.Favorites].favoriteOffers;

export const cityLocations = (store: StateType) => {
  const city = store[NameSpace.Current].currentcity;
  const offers = store[NameSpace.Offers].offers.filter(
    (offer) => offer.city.name === city
  );
  return offers.map((offer) => ({
    location: offer.location,
    id: offer.id,
    cityLocation: offer.city.location,
  }));
};

export const nearLocations = (id: number) => (store: StateType) => {
  const locations = store[NameSpace.Offers].nearOffers.map((offer) => ({
    location: offer.location,
    id: offer.id,
    cityLocation: offer.city.location,
  }));
  const currentLocation = store[NameSpace.Offers].offers.find(
    (offer) => offer.id === id
  );
  return [
    ...locations,
    {
      location: currentLocation?.location,
      id,
      cityLocation: currentLocation?.city.location,
    },
  ];
};

export const offerByID = (id: number) => (store: StateType) =>
  store[NameSpace.Offers].offers.find((e) => e.id === id);

export const someOffersData = (store: StateType) => {
  const city = store[NameSpace.Current].currentcity;
  const offers = store[NameSpace.Offers].offers.filter(
    (offer) => offer.city.name === city
  );
  return offers.map((offer) => ({
    id: offer.id,
    price: offer.price,
    rating: offer.rating,
  }));
};

export const spinnerStatus = (store: StateType) => store[NameSpace.Spinner].spinnerDisabled;
