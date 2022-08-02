import CityItem from '../city-item/city-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity, setMapSettings } from '../../store/action-creaters';
import { OfferType } from '../../types/offer-type';
import {MapSettings} from '../../types/map-types';
import { DEFAULT_MAP_SETTINGS } from '../../const';

type CitiesListProps = {
  cities: string[];
};

export default function CitiesList(props: CitiesListProps): JSX.Element {
  const { cities } = props;
  const dispath = useAppDispatch();
  const {city: currentCity, offers} = useAppSelector((state) => state.reducer);

  const callback = (value: string) => {
    dispath(changeCity(value));
    dispath(setMapSettings(pullOutMapSettings(value, offers)));
  };

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {cities.map((city) => (
            <CityItem key={city} city={city} active={city === currentCity} callback={callback}/>
          ))}
        </ul>
      </section>
    </div>
  );
}

const pullOutMapSettings = (city: string, offers: OfferType[]): MapSettings => {
  const room = offers.find((offer) => offer.city.name === city);
  return room?.city.location || DEFAULT_MAP_SETTINGS;
};
