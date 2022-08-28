import Map from '../../components/map/map';
import Sorts from '../../components/sorts/sorts';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { useAppSelector } from '../../hooks';
import { OfferTypeToSort } from '../../types/offer-type';
import { shallowEqual } from 'react-redux';
import { currentSort } from '../../store/selectors/selectors';

type MainPageFilledSectionProps = {
  offers: OfferTypeToSort[];
};

export default function MainPageFilledSection(
  props: MainPageFilledSectionProps
): JSX.Element {
  const { offers } = props;
  const sort = useAppSelector(currentSort, shallowEqual);

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{`${offers.length} places to stay in City`}</b>
        <Sorts currentSort={sort} />
        <div className='cities__places-list places__list tabs__content'>
          <PlaceCardList
            offers={offers}
            isNearList={false}
            currentSort={sort}
          />
        </div>
      </section>
      <div className='cities__right-section'>
        <Map />
      </div>
    </div>
  );
}
