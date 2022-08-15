type SortItemProps = {
  sort: string;
  currentSort: string;
  callback: (select: string) => void;
};

export default function SortItem(props: SortItemProps): JSX.Element {
  const { sort, currentSort, callback } = props;

  const onClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    callback(String(evt.currentTarget.textContent));
  };

  return (
    <li
      onClick={onClickHandler}
      className={`places__option ${isActive(sort, currentSort)}`}
      tabIndex={0}
    >
      {sort}
    </li>
  );
}

const isActive = (value: string, currentSort: string) =>
  value === currentSort ? 'places__option--active' : '';
