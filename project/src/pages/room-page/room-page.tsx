import { useParams } from 'react-router-dom';
import { OfferType } from '../../types/offer-type';
import { CommentType } from '../../types/comment-type';
import Page404 from '../404-page/404-page';
import RoomImage from '../../components/room-image/room-image';
import { converToPercent } from '../../util';
import CommentSection from '../../components/comments-section/comments-section';
import Map from '../../components/map/map';
import { MapSettings } from '../../types/map-types';

const DECIMAL = 10;

type RoomPageProps = {
  rooms: OfferType[];
  comments: CommentType[];
  mapSettings: MapSettings,
};

export default function RoomPage(props: RoomPageProps): JSX.Element {
  const { id } = useParams();
  const { rooms, comments, mapSettings } = props;
  const room = rooms.find(
    (element) => element.id === parseInt(String(id), DECIMAL)
  );
  return room ? (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link' href='main.html'>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <a
                    className='header__nav-link header__nav-link--profile'
                    href={'#profile'}
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>
                      Oliver.conner@gmail.com
                    </span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#signout'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
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
            <Map mapSettings={mapSettings} rooms={rooms} />
          </section>
        </section>

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <div className='near-places__list places__list'>
              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <a href='#image'>
                    <img
                      className='place-card__image'
                      src='img/room.jpg'
                      width={260}
                      height={200}
                      alt='Place'
                    />
                  </a>
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>€80</b>
                      <span className='place-card__price-text'>
                        /&nbsp;night
                      </span>
                    </div>
                    <button
                      className='place-card__bookmark-button place-card__bookmark-button--active button'
                      type='button'
                    >
                      <svg
                        className='place-card__bookmark-icon'
                        width={18}
                        height={19}
                      >
                        <use xlinkHref='#icon-bookmark' />
                      </svg>
                      <span className='visually-hidden'>In bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{ width: '80%' }} />
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <a href='#ref'>Wood and stone place</a>
                  </h2>
                  <p className='place-card__type'>Private room</p>
                </div>
              </article>
              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <a href='#ref'>
                    <img
                      className='place-card__image'
                      src='img/apartment-02.jpg'
                      width={260}
                      height={200}
                      alt='Place'
                    />
                  </a>
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>€132</b>
                      <span className='place-card__price-text'>
                        /&nbsp;night
                      </span>
                    </div>
                    <button
                      className='place-card__bookmark-button button'
                      type='button'
                    >
                      <svg
                        className='place-card__bookmark-icon'
                        width={18}
                        height={19}
                      >
                        <use xlinkHref='#icon-bookmark' />
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{ width: '80%' }} />
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <a href='#ref'>Canal View Prinsengracht</a>
                  </h2>
                  <p className='place-card__type'>Apartment</p>
                </div>
              </article>
              <article className='near-places__card place-card'>
                <div className='place-card__mark'>
                  <span>Premium</span>
                </div>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <a href='#ref'>
                    <img
                      className='place-card__image'
                      src='img/apartment-03.jpg'
                      width={260}
                      height={200}
                      alt='Place'
                    />
                  </a>
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>€180</b>
                      <span className='place-card__price-text'>
                        /&nbsp;night
                      </span>
                    </div>
                    <button
                      className='place-card__bookmark-button button'
                      type='button'
                    >
                      <svg
                        className='place-card__bookmark-icon'
                        width={18}
                        height={19}
                      >
                        <use xlinkHref='#icon-bookmark' />
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{ width: '100%' }} />
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <a href='#ref'>Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className='place-card__type'>Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : (
    <Page404 />
  );
}
