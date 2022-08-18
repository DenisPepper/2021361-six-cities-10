import { useParams } from 'react-router-dom';
import Page404 from '../404-page/404-page';
import RoomImage from '../../components/room-image/room-image';
import { converToPercent } from '../../util';
import CommentSection from '../../components/comments-section/comments-section';
import Map from '../../components/map/map';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Header from '../../components/header/header';
import { getOffer } from '../../store/action-creaters-middleware';

const DECIMAL = 10;

export default function RoomPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  dispatch(getOffer(parseInt(String(id), DECIMAL)));
  const room = useAppSelector((state) => state.reducer.room);
  const comments = useAppSelector((state) => state.reducer.comments);
  const nearOffers = useAppSelector((state) => state.reducer.nearOffers);

  return room ? (
    <div className='page'>
      <Header isLoginPage={false}/>
      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {room.images.map((element) => (
                <RoomImage key={element} src={element}></RoomImage>
              ))}
            </div>
          </div>

          <div className='property__container container'>
            <div className='property__wrapper'>
              {room.isPremium ? (
                <div className='property__mark'>
                  <span>Premium</span>
                </div>
              ) : null}

              <div className='property__name-wrapper'>
                <h1 className='property__name'>{room.title}</h1>
                <button
                  className='property__bookmark-button button'
                  type='button'
                >
                  <svg
                    className='property__bookmark-icon'
                    width={31}
                    height={33}
                  >
                    <use xlinkHref='#icon-bookmark' />
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>

              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{ width: `${converToPercent(room.rating)}%` }} />
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>
                  {room.rating}
                </span>
              </div>

              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {room.type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {`${room.bedrooms} Bedrooms`}
                </li>
                <li className='property__feature property__feature--adults'>
                  {`Max ${room.maxAdults} adults`}
                </li>
              </ul>

              <div className='property__price'>
                <b className='property__price-value'>€{room.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>

              <div className='property__inside'>
                <h2 className='property__inside-title'>What is inside</h2>
                <ul className='property__inside-list'>
                  {room.goods.map((element) => (
                    <li key={element} className='property__inside-item'>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div
                    className={`property__avatar-wrapper ${
                      room.host.isPro ? 'property__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className='property__avatar user__avatar'
                      src={room.host.avatarUrl}
                      width={74}
                      height={74}
                      alt='Host avatar'
                    />
                  </div>
                  <span className='property__user-name'>{room.host.name}</span>
                  {room.host.isPro ? (
                    <span className='property__user-status'>Pro</span>
                  ) : null}
                </div>
                <div className='property__description'>
                  <p className='property__text'>{room.description}</p>
                </div>
              </div>
              <CommentSection
                comments={comments.filter((comment) => comment.id === room.id)}
                id={room.id}
              />
            </div>
          </div>
          <section className='property__map map'>
            <Map/>
          </section>
        </section>

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <PlaceCardList offers={nearOffers} isNearList currentSort='' />
          </section>
        </div>
      </main>
    </div>
  ) : (
    <Page404 />
  );
}
