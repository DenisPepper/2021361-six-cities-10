import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks';
import { AppPath } from '../../settings';
import { setCurrentCity } from '../../store/slices/currents-slice/currents-slice';

type LoginProps = {
  onFormSubmit: (evt: React.SyntheticEvent<HTMLFormElement>) => void;
  city: string;
};

export default function LoginConteiner(props: LoginProps) {
  const { onFormSubmit, city } = props;
  const dispatch = useAppDispatch();
  const handleCityClick = () => dispatch(setCurrentCity(city));

  return (
    <div className='page page--gray page--login'>
      <Header isLoginPage />
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              onSubmit={onFormSubmit}
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
              <Link
                onClick={handleCityClick}
                className='locations__item-link'
                to={AppPath.MainPage}
              >
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
