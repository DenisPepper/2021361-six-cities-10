import { useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { UseMapParams } from '../types/map-types';

export default function useMap(params: UseMapParams): Map | null {
  const { mapRef, mapSettings } = params;
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: mapSettings.latitude,
          lng: mapSettings.longitude,
        },
        zoom: mapSettings.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);

      setMap(instance);

      return () => {
        mapRef.current = null;
      };
    }
  }, [mapRef, map, mapSettings]);

  return map;
}
