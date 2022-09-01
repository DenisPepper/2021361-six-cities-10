import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Location } from '../../types/map-types';
import { MapIconsURL, ICON_SIZE, DEFAULT_MAP_SETTINGS } from '../../settings';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { getInteger } from '../../util';
import { shallowEqual } from 'react-redux';
import {
  cityLocations,
  currenRoomID,
  nearLocations,
} from '../../store/selectors/selectors';

const defaultCustomIcon = new Icon({
  iconUrl: MapIconsURL.Default,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

const currentCustomIcon = new Icon({
  iconUrl: MapIconsURL.Current,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

export default function Map(): JSX.Element {
  const { id: idFromPath } = useParams();
  const offersLocations = useAppSelector(
    idFromPath ? nearLocations(getInteger(idFromPath)) : cityLocations,
    shallowEqual
  );
  const currentID =
    useAppSelector(currenRoomID, shallowEqual) || getInteger(idFromPath);
  const location = offersLocations[0].cityLocation || DEFAULT_MAP_SETTINGS;

  const mapRef = useRef(null);
  const map = useMap({ mapRef, location });
  useEffect(() => {
    if (map === null) {
      return;
    }
    map.panTo({ lat: location.latitude, lng: location.longitude });
    offersLocations.forEach((element) => {
      if (element.location) {
        createMarker(element.location, element.id, currentID).addTo(map);
      }
    });
  }, [map, offersLocations, location.latitude, location.longitude, currentID]);
  return (
    <section
      style={{ height: '600px' }}
      ref={mapRef}
      className='cities__map map'
    />
  );
}

const createMarker = (location: Location, id: number, currentID: number) => {
  const marker = new Marker({
    lat: location.latitude,
    lng: location.longitude,
  });
  marker.setIcon(id === currentID ? currentCustomIcon : defaultCustomIcon);
  return marker;
};
