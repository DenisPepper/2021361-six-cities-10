import React from 'react';
import { OfferType } from '../../types/offer-type';
import FavoritesLocation from '../favorites-location/favorites-location';

type FavoritesListProps = {
  rooms: OfferType[];
};

export default function FavoritesList(props: FavoritesListProps): JSX.Element {
  const { rooms } = props;
  const group = groupByCity(rooms);
  return (
    <React.Fragment>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              {group.cityNames.map((cityName, index) => (<FavoritesLocation key={++index} cityName={cityName} rooms={group.cityData.get(cityName)}/>))}
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
  cityNames: string[];
  cityData: Map<string, OfferType[]>;
};

const groupByCity = (rooms: OfferType[]): GroupType => {
  const cityData = new Map<string, OfferType[]>();
  const cityNames: string[] = [];
  rooms.forEach((room) => {
    const cityName = room.city.name;
    if (cityData.has(cityName)) {
      cityData.get(cityName)?.push(room);
    } else {
      cityData.set(cityName, [room]);
      cityNames.push(cityName);
    }
  });
  return { cityNames, cityData };
};
