import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../types/offer-type';
import { useState } from 'react';

type PlaceCardListProps = {
  rooms: OfferType[];
  isNearList: boolean;
};

export default function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { rooms, isNearList } = props;
  const [, setCurrentID] = useState(NaN);

  const callback = (id: number) => setCurrentID(id);

  return (
    <div className={`${isNearList ? 'cities__places-list tabs__content' : 'near-places__list'} 'places__list'`}>
      {rooms.map((room) => (
        <PlaceCard key={room.id} room={room} callback={callback} isNearList={isNearList}></PlaceCard>
      ))}
    </div>
  );
}
