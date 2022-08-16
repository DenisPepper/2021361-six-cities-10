import { Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppPath } from '../../settings';
import { login } from '../../store/action-creaters-middleware';

const throwError = (msg: string) => {throw new Error(msg);};

type FormDataType = string | null | File;

const assertString = (value: FormDataType, fieldName: string) => typeof value === 'string' ? value : throwError(`${fieldName} not valid`);

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
  };

  return isAuthorized ? (
    <Navigate to={AppPath.MainPage} />
  ) : (
    <div className='page page--gray page--login'>
      <Header isLoginPage />
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              onSubmit={onSubmitHandler}
              className='login__form form'
              action='#'
              method='post'
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required
                />
              </div>
              <button
                className='login__submit form__submit button'
                type='submit'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              {/*FIXME: почему Амстердам?*/}
              <a className='locations__item-link' href='#ref'>
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
