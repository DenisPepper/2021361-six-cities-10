import PlaceCard from '../place-card/place-card';
import { useAppDispatch } from '../../hooks/index';
import { setCurrentID } from '../../store/slices/currents-slice/currents-slice';
import { SortsRules } from '../../settings';
import { OfferTypeToSort } from '../../types/offer-type';

type PlaceCardListProps = {
  offers: OfferTypeToSort[];
  isNearList: boolean;
  currentSort: string;
};

export default function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { offers, isNearList, currentSort } = props;
  const dispatch = useAppDispatch();

  const onMouseOver = (id: number) => dispatch(setCurrentID(id));

  return (
    <div
      className={`${
        isNearList ? 'cities__places-list tabs__content' : 'near-places__list'
      } places__list`}
    >
      {[...offers].sort(SortsRules[currentSort]).map((offer) => (
        <PlaceCard
          key={offer.id}
          id={offer.id}
          onMouseOver={onMouseOver}
          isNearList={isNearList}
        />
      ))}
    </div>
  );
}
