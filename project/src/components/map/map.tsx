import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { MapSettings, Location } from '../../types/map-types';
import { OfferType } from '../../types/offer-type';
import { URL_MARKER_DEFAULT, ICON_SIZE } from '../../const';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

type MapProps = {
  mapSettings: MapSettings;
  rooms: OfferType[];
};

export default function Map(props: MapProps): JSX.Element {
  const { mapSettings, rooms } = props;
  const mapRef = useRef(null);
  const map = useMap({ mapRef, mapSettings });
  useEffect(() => {
    if (map === null) {
      return;
    }
    rooms.forEach((room) => {
      createMarker(room.location).addTo(map);
    });
  }, [map, rooms]);
  return <section style={{height: '500px'}} ref={mapRef} className='cities__map map'></section>;
}


const createMarker = (location: Location) => {
  const marker = new Marker({ lat: location.latitude, lng: location.longitude });
  marker.setIcon(defaultCustomIcon);
  return marker;
};
