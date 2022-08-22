import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppPath } from '../../settings';
import MainPage from '../../pages/main-page/main-page';
import Page404 from '../../pages/404-page/404-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import RoomPage from '../../pages/room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks';

type AppProps = {
  cities: string[];
};

export default function App(props: AppProps): JSX.Element {
  const { cities } = props;
  const offersLoaded = useAppSelector((store) => store.reducer.offersLoaded);

  return offersLoaded ? (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath.MainPage}>
          <Route index element={<MainPage cities={cities} />} />
          <Route path={AppPath.LoginPage} element={<LoginPage/>} />
          <Route
            path={AppPath.FavoritesPage}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppPath.Offer}>
            <Route path=':id' element={<RoomPage />} />
          </Route>
          <Route path={AppPath.Page404} element={<Page404></Page404>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Spinner />
  );
}
