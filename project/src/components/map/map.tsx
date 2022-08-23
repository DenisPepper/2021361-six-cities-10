import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Location } from '../../types/map-types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, ICON_SIZE, DEFAULT_MAP_SETTINGS } from '../../settings';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { StateType } from '../../types/state-type';
import { useParams } from 'react-router-dom';
import { getInteger } from '../../util';


const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

const selectCityLocations = (store: StateType) => {
  const city = store.reducer.city;
  const offers = store.reducer.offers.filter((offer) => offer.city.name === city);
  return offers.map((offer) => ({location: offer.location, id: offer.id, cityLocation: offer.city.location}));
};

const selectNearLocations = (id: number) => (store: StateType) => {
  const nearLocations = store.reducer.nearOffers.map(
    (offer) => ({location: offer.location, id: offer.id, cityLocation: offer.city.location}));
  const thisOffer = store.reducer.offers.find((offer) => offer.id === id);
  return [...nearLocations, {location: thisOffer?.location, id, cityLocation: thisOffer?.city.location}];
};

export default function Map(): JSX.Element {
  const { id: idFromPath } = useParams();
  const offersLocations = useAppSelector(idFromPath ? selectNearLocations(getInteger(idFromPath)) : selectCityLocations);
  const currentID = useAppSelector((state) => state.reducer.currentID) || getInteger(idFromPath);
  const location = offersLocations[0].cityLocation || DEFAULT_MAP_SETTINGS;

  const mapRef = useRef(null);
  const map = useMap({ mapRef, location });
  useEffect(() => {
    if (map === null) {
      return;
    }
    map.panTo({lat: location.latitude, lng: location.longitude});
    offersLocations.forEach((element) => {
      if (element.location) {
        createMarker(element.location, element.id, currentID).addTo(map);
      }
    });
  }, [map, offersLocations, location.latitude, location.longitude, currentID]);
  return <section style={{height: '600px'}} ref={mapRef} className='cities__map map'></section>;
}

const createMarker = (location: Location, id: number, currentID: number) => {
  const marker = new Marker({ lat: location.latitude, lng: location.longitude });
  marker.setIcon(id === currentID ? currentCustomIcon : defaultCustomIcon);
  return marker;
};
