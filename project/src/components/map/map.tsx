import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Location } from '../../types/map-types';
import { URL_MARKER_DEFAULT, ICON_SIZE, DEFAULT_MAP_SETTINGS } from '../../const';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { OfferType } from '../../types/offer-type';
import { filterOffersByCity } from '../../util';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

export default function Map(): JSX.Element {
  const offers = useAppSelector((state) => state.reducer.offers);
  const city = useAppSelector((state) => state.reducer.city);
  const cityOffers = filterOffersByCity(city, offers);
  const location = pullOutMapSettings(city, offers);

  const mapRef = useRef(null);
  const map = useMap({ mapRef, location });
  useEffect(() => {
    if (map === null) {
      return;
    }
    map.panTo({lat: location.latitude, lng: location.longitude});
    cityOffers.forEach((room) => {
      createMarker(room.location).addTo(map);
    });
  }, [map, cityOffers, location.latitude, location.longitude]);
  return <section style={{height: '600px'}} ref={mapRef} className='cities__map map'></section>;
}


const createMarker = (location: Location) => {
  const marker = new Marker({ lat: location.latitude, lng: location.longitude });
  marker.setIcon(defaultCustomIcon);
  return marker;
};

const pullOutMapSettings = (city: string, offers: OfferType[]): Location => {
  const room = offers.find((offer) => offer.city.name === city);
  return room?.city.location || DEFAULT_MAP_SETTINGS;
};
