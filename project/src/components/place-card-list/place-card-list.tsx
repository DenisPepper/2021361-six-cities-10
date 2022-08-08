import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../types/offer-type';
import { useAppDispatch } from '../../hooks/index';
import { setCurrentID } from '../../store/action-creaters';

type PlaceCardListProps = {
  cityOffers: OfferType[];
  isNearList: boolean;
};

export default function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { cityOffers, isNearList } = props;
  const dispatch = useAppDispatch();

  const callback = (id: number) => dispatch(setCurrentID(id));

  return (
    <div className={`${isNearList ? 'cities__places-list tabs__content' : 'near-places__list'} places__list`}>
      {cityOffers.map((offer) => (
        <PlaceCard key={offer.id} room={offer} callback={callback} isNearList={isNearList}></PlaceCard>
      ))}
    </div>
  );
}
