type CityItemProps = {
  city: string;
  callback: (city: string) => void;
  active: boolean;
};

export default function CityItem(props: CityItemProps): JSX.Element {
  const { city, active, callback } = props;

  const onClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    callback(String(evt.currentTarget.textContent));
  };

  return (
    <li className='locations__item'>
      <a
        href='ref'
        onClick={onClickHandler}
        className={`locations__item-link tabs__item ${active ? 'tabs__item--active' : ''}`}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}
