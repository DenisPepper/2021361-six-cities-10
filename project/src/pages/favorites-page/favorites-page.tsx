import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { shallowEqual } from 'react-redux';

export default function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state.reducer.favoriteOffers, shallowEqual);
  const isEmpty = offers.length === 0;
  return (
    <div className={`'page'${isEmpty ? ' page--favorites-empty' : ''}`}>
      <Header isLoginPage={false}/>
      {isEmpty ? <FavoritesEmpty /> : <FavoritesList offers={offers} />}
    </div>
  );
}
