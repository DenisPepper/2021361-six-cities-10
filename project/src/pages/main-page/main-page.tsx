import Map from '../../components/map/map';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import CitiesList from '../../components/cities-list/cities-list';
import Sorts from '../../components/sorts/sorts';
import { useAppSelector } from '../../hooks';
import { filterOffersByCity } from '../../util';

type MainPageProps = {
  cities: string[];
};

export default function MainPage(props: MainPageProps): JSX.Element {
  const { cities } = props;
  const cityOffers = filterOffersByCity(
    useAppSelector((state) => state.reducer.city),
    useAppSelector((state) => state.reducer.offers)
  );

  return (
    <div className='page page--gray page--main'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a
                className='header__logo-link header__logo-link--active'
                href='#ref'
              >
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width='81'
                  height='41'
                />
              </a>
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

      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList cities={cities} />

        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{`${cityOffers.length} places to stay in City`}</b>
              <Sorts />

              <div className='cities__places-list places__list tabs__content'>
                <PlaceCardList cityOffers={cityOffers} isNearList={false} />
              </div>
            </section>
            <div className='cities__right-section'>
              <Map />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
