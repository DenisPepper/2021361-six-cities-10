import { MutableRefObject } from 'react';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type UseMapParams = {
  mapRef: MutableRefObject<HTMLElement | null>;
  location: Location;
};
