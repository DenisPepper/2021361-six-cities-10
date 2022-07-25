import { OfferType } from '../../types/offer-type';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesLocationProps = {
    cityName: string,
    rooms: OfferType[] | undefined,
};

export default function FavoritesLocation(props: FavoritesLocationProps): JSX.Element {
  const {cityName, rooms} = props;
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='#ref'>
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        {rooms?.map((room, index)=>(<FavoriteCard key={room.id} room={room}/>))}
      </div>
    </li>
  );
}
