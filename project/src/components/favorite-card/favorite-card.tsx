import { OfferType } from '../../types/offer-type';
import {converToPercent} from '../../util';

type FavoriteCardProps = {
  room: OfferType;
};

export default function FavoriteCard(props: FavoriteCardProps): JSX.Element {
  const { room } = props;
  return (
    <article className='favorites__card place-card'>

      {room.isPremium ? (<div className='place-card__mark'><span>Premium</span></div>) : null}

      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <a href='#ref'>
          <img
            className='place-card__image'
            src={room.previewImage}
            width={150}
            height={110}
            alt='view'
          />
        </a>
      </div>

      <div className='favorites__card-info place-card__info'>

        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>€{room.price}</b>
            <span className='place-card__price-text'>/&nbsp;night</span>
          </div>
          <button
            className='place-card__bookmark-button place-card__bookmark-button--active button'
            type='button'
          >
            <svg className='place-card__bookmark-icon' width={18} height={19}>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>

        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${converToPercent(room.rating)}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#ref'>{room.title}</a>
        </h2>
        <p className='place-card__type'>{room.type}</p>
      </div>

    </article>
  );
}
