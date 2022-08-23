import { CommentType } from './comment-type';

export type OfferType = {
  bedrooms: number;
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  description: string;
  goods: string[];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type OfferTypeToSort = {
  id: number;
  price: number;
  rating: number;
};

export type OfferTypePostFavorite = {
  id: number;
  isFavorite: boolean;
};

export type OfferTypeFullData = {
  room: OfferType;
  nearOffers: OfferType[];
  comments: CommentType[];
};
