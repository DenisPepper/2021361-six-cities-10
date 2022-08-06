import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOffers } from '../../store/action-creaters';
import { OfferType } from '../../types/offer-type';
//import { SortsName, SortsRules } from '../../const';

const SortsName = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

const SortsRules = {
  [SortsName.POPULAR]: (a: OfferType, b: OfferType) => a.id - b.id,
  [SortsName.PRICE_LOW_TO_HIGH]: (a: OfferType, b: OfferType) =>
    a.price - b.price,
  [SortsName.PRICE_HIGH_TO_LOW]: (a: OfferType, b: OfferType) =>
    b.price - a.price,
  [SortsName.TOP_RATED_FIRST]: (a: OfferType, b: OfferType) =>
    b.rating - a.rating,
};

export default function Sorts(): JSX.Element {
  const [isOpened, setOpened] = useState(false);
  const [currentSort, setCurrentSort] = useState(SortsName.POPULAR);
  const dispath = useAppDispatch();
  const offers = useAppSelector((store) => store.reducer.offers);

  const onClickHandler = () => setOpened(!isOpened);

  const onSelectHandler = (evt: React.MouseEvent<HTMLElement>) => {
    const listItem = evt.target as HTMLElement;
    const select = String(listItem.textContent);
    if (select !== currentSort) {
      setCurrentSort(String(listItem.textContent));
      dispath(setOffers([...offers].sort(SortsRules[select])));
    }
    setOpened(!isOpened);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span
        onClick={onClickHandler}
        className='places__sorting-type'
        tabIndex={0}
      >
        {currentSort}
        <svg className='places__sorting-arrow' width={7} height={4}>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      <ul
        onClick={onSelectHandler}
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
      >
        <li
          className={`places__option ${isActive(
            SortsName.POPULAR,
            currentSort
          )}`}
          tabIndex={0}
        >
          {SortsName.POPULAR}
        </li>
        <li
          className={`places__option ${isActive(
            SortsName.PRICE_LOW_TO_HIGH,
            currentSort
          )}`}
          tabIndex={0}
        >
          {SortsName.PRICE_LOW_TO_HIGH}
        </li>
        <li
          className={`places__option ${isActive(
            SortsName.PRICE_HIGH_TO_LOW,
            currentSort
          )}`}
          tabIndex={0}
        >
          {SortsName.PRICE_HIGH_TO_LOW}
        </li>
        <li
          className={`places__option ${isActive(
            SortsName.TOP_RATED_FIRST,
            currentSort
          )}`}
          tabIndex={0}
        >
          {SortsName.TOP_RATED_FIRST}
        </li>
      </ul>
    </form>
  );
}

const isActive = (value: string, currentSort: string) =>
  value === currentSort ? 'places__option--active' : '';
