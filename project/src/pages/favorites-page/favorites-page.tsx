import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { Link } from 'react-router-dom';
import { AppPath } from '../../const';
import { useAppSelector } from '../../hooks';
import { OfferType } from '../../types/offer-type';

export default function FavoritesPage(): JSX.Element {
  const offers = getFavorites(useAppSelector((state) => state.reducer.offers));

  const isEmpty = offers.length === 0;
  return (
    <div className={`'page'${isEmpty ? ' page--favorites-empty' : ''}`}>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link className='header__logo-link' to={AppPath.MainPage}>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <a
                    className='header__nav-link header__nav-link--profile'
                    href='#ref'
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>
                      Oliver.conner@gmail.com
                    </span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#ref'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {isEmpty ? <FavoritesEmpty /> : <FavoritesList offers={offers} />}
    </div>
  );
}

const getFavorites = (rooms: OfferType[]): OfferType[] =>
  rooms.filter((room) => room.isFavorite);
