type CityItemProps = {
  city: string;
  onItemClick: (city: string) => void;
  active: boolean;
};

export default function CityItem(props: CityItemProps): JSX.Element {
  const { city, active, onItemClick } = props;

  const handleItemClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onItemClick(String(evt.currentTarget.textContent));
  };

  return (
    <li className='locations__item'>
      <a
        href='ref'
        onClick={handleItemClick}
        className={`locations__item-link tabs__item ${
          active ? 'tabs__item--active' : ''
        }`}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}
