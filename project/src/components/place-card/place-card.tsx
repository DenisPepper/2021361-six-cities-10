import { converToPercent } from '../../util';
import { AppPath } from '../../settings';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Page404 from '../../pages/404-page/404-page';
import FavoriteButton from '../../components/favorite-button/favorite-button';

type PlaceCardProps = {
  id: number;
  callback: (id: number) => void;
  isNearList: boolean;
};

export default function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { id, callback, isNearList } = props;
  const handleCardOnMouseOver = () => {
    if (!isNearList) {
      callback(id);
    }
  };

  const offer = useAppSelector((store) =>
    store.reducer.offers.find((e) => e.id === id)
  );

  return offer ? (
    <article
      className={`${
        isNearList ? 'near-places__card' : 'cities__card'
      } place-card`}
      onMouseOver={handleCardOnMouseOver}
    >
      {offer.isPremium ? (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      ) : null}
      <div
        className={`${
          isNearList ? 'near-places__image-wrapper' : 'cities__image-wrapper'
        } 'place-card__image-wrapper'`}
      >
        <Link to={`${AppPath.Offer}${id}`}>
          <img
            className='place-card__image'
            src={offer.previewImage}
            width='260'
            height='200'
            alt='preview'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={offer.isFavorite} id={id}/>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${converToPercent(offer.rating)}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppPath.Offer}${id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  ) : (
    <Page404 />
  );
}
