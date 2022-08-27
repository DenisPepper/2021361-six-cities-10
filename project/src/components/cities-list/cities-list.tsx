import CityItem from '../city-item/city-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action-creaters';
import { shallowEqual } from 'react-redux';

type CitiesListProps = {
  cities: string[];
};

export default function CitiesList(props: CitiesListProps): JSX.Element {
  const { cities } = props;
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.reducer.city, shallowEqual);

  const onItemClick = (value: string) => {
    dispatch(changeCity(value));
  };

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {cities.map((city) => (
            <CityItem
              key={city}
              city={city}
              active={city === currentCity}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
