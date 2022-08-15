import Map from '../../components/map/map';
import Sorts from '../../components/sorts/sorts';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { OfferType } from '../../types/offer-type';
import { useAppSelector } from '../../hooks';
import { SortsRules } from '../../settings';

type MainPageFilledSectionProps = {
  cityOffers: OfferType[];
};

export default function MainPageFilledSection(props: MainPageFilledSectionProps): JSX.Element {
  const { cityOffers } = props;
  const currentSort = useAppSelector((store) => store.reducer.currentSort);

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{`${cityOffers.length} places to stay in City`}</b>
        <Sorts currentSort={currentSort}/>

        <div className='cities__places-list places__list tabs__content'>
          <PlaceCardList cityOffers={[...cityOffers].sort(SortsRules[currentSort])} isNearList={false} />
        </div>
      </section>
      <div className='cities__right-section'>
        <Map />
      </div>
    </div>
  );
}
