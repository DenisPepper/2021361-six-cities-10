import CityItem from '../city-item/city-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action-creaters';

type CitiesListProps = {
  cities: string[];
};

export default function CitiesList(props: CitiesListProps): JSX.Element {
  const { cities } = props;
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.reducer.city);

  const callback = (value: string) => {
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
              callback={callback}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}


