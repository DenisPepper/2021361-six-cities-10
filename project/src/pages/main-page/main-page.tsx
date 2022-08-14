import CitiesList from '../../components/cities-list/cities-list';
import MainPageEmptySection from '../main-page-empty-section.ts/main-page-empty-section';
import MainPageFilledSection from '../main-page-filled-section/main-page-filled-section';
import Header from '../../components/header/header';
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
      <Header isLoginPage={false}/>
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
