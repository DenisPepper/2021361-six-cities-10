import { OfferType } from '../../types/offer-type';
import { converToPercent } from '../../util';
import { AppPath } from '../../const';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type PlaceCardProps = {
  room: OfferType;
  callback: (id: number) => void;
};

export default function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { room, callback } = props;
  const onMouseOverHandler = () => callback(room.id);
  const[id] = useState(room.id);
  return (
    <article
      className='cities__card place-card'
      onMouseOver={onMouseOverHandler}
    >
      {room.isPremium ? (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      ) : null}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`${AppPath.Offer}${id}`}>
          <img
            className='place-card__image'
            src={room.previewImage}
            width='260'
            height='200'
            alt='preview'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{room.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className='place-card__bookmark-button button' type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${converToPercent(room.rating)}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppPath.Offer}${id}`}>{room.title}</Link>
        </h2>
        <p className='place-card__type'>{room.type}</p>
      </div>
    </article>
  );
}
