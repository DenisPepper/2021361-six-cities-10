import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppPath, CITIES } from '../../settings';
import { login } from '../../store/action-creaters-middleware';
import LoginConteiner from '../../components/login-conteiner/login-conteiner';
import { getRandomInteger } from '../../util';

const throwError = (msg: string) => {
  throw new Error(msg);
};

type FormDataType = string | null | File;

const assertString = (value: FormDataType, fieldName: string) =>
  typeof value === 'string' ? value : throwError(`${fieldName} not valid`);

const validate = (form: FormData) => ({
  login: assertString(form.get('email'), 'email'),
  password: assertString(form.get('password'), 'password'),
});

export default function LoginPage(): JSX.Element {
  const city = CITIES[getRandomInteger(0, CITIES.length - 1)];

  const dispatch = useAppDispatch();

  const isAuthorized =
    useAppSelector((store) => store.reducer.authorizationStatus) ===
    AuthorizationStatus.Yes;

  const handleFormSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const authData = validate(new FormData(evt.currentTarget));
    if(authData.password.match(/(?=.*[a-zа-яё]|.*[A-ZА-ЯЁ])(?=.*\d).*/)) {
      dispatch(login(authData));
    }
  };

  return isAuthorized ? (
    <Navigate to={AppPath.MainPage} />
  ) : (
    <LoginConteiner callback={handleFormSubmit} city={city}/>
  );
}
