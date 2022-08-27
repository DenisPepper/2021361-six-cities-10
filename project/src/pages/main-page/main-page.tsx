import CitiesList from '../../components/cities-list/cities-list';
import MainPageEmptySection from '../main-page-empty-section.ts/main-page-empty-section';
import MainPageFilledSection from '../main-page-filled-section/main-page-filled-section';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { StateType } from '../../types/state-type';
import { shallowEqual } from 'react-redux';

type MainPageProps = {
  cities: string[];
};

const selectSomeOffersData = (store: StateType) => {
  const city = store.reducer.city;
  const offers = store.reducer.offers.filter((offer) => offer.city.name === city);
  return offers.map((offer) => ({id: offer.id, price: offer.price, rating: offer.rating}));
};

export default function MainPage(props: MainPageProps): JSX.Element {
  const { cities } = props;
  const offers = useAppSelector(selectSomeOffersData, shallowEqual);
  const isEmpty = offers.length === 0;

  return (
    <div className='page page--gray page--main'>
      <Header isLoginPage={false}/>
      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList cities={cities} />
        <div className='cities'>
          {isEmpty ? (<MainPageEmptySection />) : (<MainPageFilledSection offers={offers}/>)}
        </div>
      </main>
    </div>
  );
}
