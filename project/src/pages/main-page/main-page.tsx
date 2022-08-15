import CitiesList from '../../components/cities-list/cities-list';
import MainPageEmptySection from '../main-page-empty-section.ts/main-page-empty-section';
import MainPageFilledSection from '../main-page-filled-section/main-page-filled-section';
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
  const isEmpty = cityOffers.length === 0;

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

      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList cities={cities} />
        <div className='cities'>
          {isEmpty ? (<MainPageEmptySection />) : (<MainPageFilledSection cityOffers={cityOffers}/>)}
        </div>
      </main>
    </div>
  );
}
