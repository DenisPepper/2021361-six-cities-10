import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus, AppPath } from '../../settings';
import { Link } from 'react-router-dom';
import { logout } from '../../store/action-creaters-middleware';

export default function HeaderNav(): JSX.Element {
  const isAuthorized =
    useAppSelector((store) => store.reducer.authorizationStatus) ===
    AuthorizationStatus.Yes;
  const userName = useAppSelector((store) => store.reducer.userName);
  const favoritesCounter = useAppSelector((store) => store.reducer.favoritesCounter);
  const dispatch = useAppDispatch();
  const handleSignOutClick = () => dispatch(logout());

  return isAuthorized ? (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link className='header__nav-link header__nav-link--profile' to={AppPath.FavoritesPage}>
            <div className='header__avatar-wrapper user__avatar-wrapper'></div>
            <span className='header__user-name user__name'>{userName}</span>
            {favoritesCounter > 0 && <span className='header__favorite-count'>{favoritesCounter}</span>}
          </Link>
        </li>

        <li onClick={handleSignOutClick} className='header__nav-item'>
          <a className='header__nav-link' href='#ref'>
            <span className='header__signout'>Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link
            className='header__nav-link header__nav-link--profile'
            to={AppPath.LoginPage}
          >
            <div className='header__avatar-wrapper user__avatar-wrapper' />
            <span className='header__login'>Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
