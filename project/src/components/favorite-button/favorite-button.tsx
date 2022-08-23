type FavoriteButtonProps = {
  isFavorite: boolean;
};

export default function FavoriteButton(
  props: FavoriteButtonProps
): JSX.Element {
  const { isFavorite } = props;
  return (
    <button className={`place-card__bookmark-button ${isFavorite && 'place-card__bookmark-button--active'} button`} type='button'>
      <svg className='place-card__bookmark-icon' width={18} height={19}>
        <use xlinkHref='#icon-bookmark' />
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}
