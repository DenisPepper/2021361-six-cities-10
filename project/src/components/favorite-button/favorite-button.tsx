import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppPath } from '../../settings';
import { changeFavoriteStatus } from '../../store/action-creaters-middleware';
import { authStatus } from '../../store/selectors/selectors';

type FavoriteButtonProps = {
  id: number;
  isFavorite: boolean;
};

export default function FavoriteButton(
  props: FavoriteButtonProps
): JSX.Element {
  const { id, isFavorite } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(authStatus, shallowEqual) === AuthorizationStatus.Yes;

  const handleButtonClick = () => {
    isAuthorized
      ? dispatch(changeFavoriteStatus({ id, isFavorite: !isFavorite }))
      : navigate(AppPath.LoginPage);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`place-card__bookmark-button ${
        isFavorite ? 'place-card__bookmark-button--active' : ''
      } button`}
      type='button'
    >
      <svg className='place-card__bookmark-icon' width={18} height={19}>
        <use xlinkHref='#icon-bookmark' />
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}
