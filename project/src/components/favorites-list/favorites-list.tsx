import React from 'react';
import { OfferType } from '../../types/offer-type';
import FavoritesLocation from '../favorites-location/favorites-location';

type FavoritesListProps = {
  rooms: OfferType[];
};

export default function FavoritesList(props: FavoritesListProps): JSX.Element {
  const { rooms } = props;
  const grouping = groupByCity(rooms);
  return (
    <React.Fragment>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              {grouping.locations.map((location) => (
                <FavoritesLocation
                  key={location}
                  cityName={String(grouping.cityNames.get(location))}
                  rooms={grouping.cityRooms.get(location)}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <a className='footer__logo-link' href='main.html'>
          <img
            className='footer__logo'
            src='img/logo.svg'
            alt='6 cities logo'
            width={64}
            height={33}
          />
        </a>
      </footer>
    </React.Fragment>
  );
}

type GroupType = {
  locations: string[];
  cityNames: Map<string, string>;
  cityRooms: Map<string, OfferType[]>;
};

const groupByCity = (rooms: OfferType[]): GroupType => {
  const cityRooms = new Map<string, OfferType[]>();
  const cityNames = new Map<string, string>();
  const locations: string[] = [];
  rooms.forEach((room) => {
    const location = `${room.city.location.latitude}${room.city.location.longitude}`;
    if (cityRooms.has(location)) {
      cityRooms.get(location)?.push(room);
    } else {
      locations.push(location);
      cityRooms.set(location, [room]);
      cityNames.set(location, room.city.name);
    }
  });
  return { locations, cityNames, cityRooms };
};
