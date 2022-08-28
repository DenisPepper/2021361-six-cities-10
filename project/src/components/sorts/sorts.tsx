import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setCurrentSort } from '../../store/slices/currents-slice/currents-slice';
import { SORTS } from '../../settings';
import SortItem from '../sort-item/sort-item';

type SortsProps = {
  currentSort: string;
};

export default function Sorts(props: SortsProps): JSX.Element {
  const { currentSort } = props;
  const [isOpened, setOpened] = useState(false);
  const dispath = useAppDispatch();

  const handleSortClick = () => setOpened(!isOpened);

  const handleSortSelect = (select: string) => {
    if (select !== currentSort) {
      dispath(setCurrentSort(select));
    }
    setOpened(!isOpened);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span
        onClick={handleSortClick}
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
          <SortItem
            key={sort}
            sort={sort}
            currentSort={currentSort}
            onSortSelect={handleSortSelect}
          />
        ))}
      </ul>
    </form>
  );
}

const getUlClassName = (isOpened: boolean) =>
  `places__options places__options--custom ${
    isOpened ? 'places__options--opened' : ''
  }`;
