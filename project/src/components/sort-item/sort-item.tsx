type SortItemProps = {
  sort: string;
  currentSort: string;
  onSortSelect: (select: string) => void;
};

export default function SortItem(props: SortItemProps): JSX.Element {
  const { sort, currentSort, onSortSelect } = props;

  const handleItemClick = (evt: React.MouseEvent<HTMLElement>) => {
    onSortSelect(String(evt.currentTarget.textContent));
  };

  return (
    <li
      onClick={handleItemClick}
      className={`places__option ${isActive(sort, currentSort)}`}
      tabIndex={0}
    >
      {sort}
    </li>
  );
}

const isActive = (value: string, currentSort: string) =>
  value === currentSort ? 'places__option--active' : '';
