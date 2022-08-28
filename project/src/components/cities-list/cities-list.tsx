import CityItem from '../city-item/city-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCity } from '../../store/slices/currents-slice/currents-slice';
import { shallowEqual } from 'react-redux';
import { currentCity } from '../../store/selectors/selectors';

type CitiesListProps = {
  cities: string[];
};

export default function CitiesList(props: CitiesListProps): JSX.Element {
  const { cities } = props;
  const dispatch = useAppDispatch();
  const city = useAppSelector(currentCity, shallowEqual);

  const onItemClick = (value: string) => {
    dispatch(setCurrentCity(value));
  };

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {cities.map((element) => (
            <CityItem
              key={element}
              city={element}
              active={element === city}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
