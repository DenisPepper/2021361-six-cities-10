import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../hooks/use-map';
import { MapSettings } from '../types/map-types';
import { OfferType } from '../types/offer-type';
import { URL_MARKER_DEFAULT } from '../const';
import 'leaflet/dist/leaflet.css';

const ICON_SIZE = 40;

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});

/*const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
});*/

type MapProps = {
  mapSettings: MapSettings;
  rooms: OfferType[];
};

export default function Map(props: MapProps): JSX.Element {
  const { mapSettings, rooms } = props;
  const mapRef = useRef(null);
  const map = useMap({ mapRef, mapSettings });
  useEffect(() => {
    if (map) {
      rooms.forEach((room) => {
        const marker = new Marker({
          lat: room.location.latitude,
          lng: room.location.longitude,
        });

        marker
          .setIcon(
            defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, rooms]);
  return <section style={{height: '500px'}} ref={mapRef} className='cities__map map'></section>;
}
