import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../types/offer-type';

type PlaceCardListProps = {
  rooms: OfferType[];
};

export default function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { rooms } = props;
  return (
    <div className='cities__places-list places__list tabs__content'>
      {rooms.map((room, index) => (
        <PlaceCard key={++index} room={room}></PlaceCard>
      ))}
    </div>
  );
}
