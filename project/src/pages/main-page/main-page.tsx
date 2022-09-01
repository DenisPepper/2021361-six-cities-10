import CitiesList from '../../components/cities-list/cities-list';
import MainPageEmptySection from '../../components/main-page-empty-section/main-page-empty-section';
import MainPageFilledSection from '../../components/main-page-filled-section/main-page-filled-section';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { shallowEqual } from 'react-redux';
import { someOffersData } from '../../store/selectors/selectors';

type MainPageProps = {
  cities: string[];
};

export default function MainPage(props: MainPageProps): JSX.Element {
  const { cities } = props;
  const offers = useAppSelector(someOffersData, shallowEqual);
  const isEmpty = offers.length === 0;

  return (
    <div className='page page--gray page--main'>
      <Header isLoginPage={false} />
      <main
        className={`page__main page__main--index ${
          isEmpty ? 'page__main--index-empty' : ''
        }`}
      >
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList cities={cities} />
        <div className='cities'>
          {isEmpty ? (
            <MainPageEmptySection />
          ) : (
            <MainPageFilledSection offers={offers} />
          )}
        </div>
      </main>
    </div>
  );
}
