import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppPath } from '../../settings';
import { login, getFavorites } from '../../store/action-creaters-middleware';
import LoginConteiner from '../../components/login-conteiner/login-conteiner';

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
  const dispatch = useAppDispatch();
  const isAuthorized =
    useAppSelector((store) => store.reducer.authorizationStatus) ===
    AuthorizationStatus.Yes;
  const onSubmitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const authData = validate(new FormData(evt.currentTarget));
    dispatch(login(authData));
    dispatch(getFavorites);
  };

  return isAuthorized ? (
    <Navigate to={AppPath.MainPage} />
  ) : (
    <LoginConteiner callback={onSubmitHandler} />
  );
}
