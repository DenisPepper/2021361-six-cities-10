import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { OfferType } from '../../types/offer-type';

export default function FavoritesPage(): JSX.Element {
  const offers = getFavorites(useAppSelector((state) => state.reducer.offers));
  const isEmpty = offers.length === 0;
  return (
    <div className={`'page'${isEmpty ? ' page--favorites-empty' : ''}`}>
      <Header isLoginPage={false}/>
      {isEmpty ? <FavoritesEmpty /> : <FavoritesList offers={offers} />}
    </div>
  );
}

const getFavorites = (rooms: OfferType[]): OfferType[] =>
  rooms.filter((room) => room.isFavorite);
