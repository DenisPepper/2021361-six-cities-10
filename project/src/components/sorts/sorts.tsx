import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOffers } from '../../store/action-creaters';
import { SORTS, SortsRules, DEFAULT_SORT } from '../../settings';
import SortItem from '../sort-item/sort-item';

export default function Sorts(): JSX.Element {
  const [isOpened, setOpened] = useState(false);
  const [currentSort, setCurrentSort] = useState(DEFAULT_SORT);
  const dispath = useAppDispatch();
  const offers = useAppSelector((store) => store.reducer.offers);

  const onClickHandler = () => setOpened(!isOpened);

  const onSelectHandler = (select: string) => {
    if (select !== currentSort) {
      setCurrentSort(String(select));
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
      <ul className={getUlClassName(isOpened)}>
        {SORTS.map((sort) => (
          <SortItem key={sort} sort={sort} currentSort={currentSort} callback={onSelectHandler}/>
        ))}
      </ul>
    </form>
  );
}

const getUlClassName = (isOpened: boolean) =>
  `places__options places__options--custom ${
    isOpened ? 'places__options--opened' : ''
  }`;
