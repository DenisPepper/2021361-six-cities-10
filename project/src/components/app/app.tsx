import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppPath, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Page404 from '../../pages/404-page/404-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import RoomPage from '../../pages/room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import { CommentType } from '../../types/comment-type';

type AppProps = {
  comments: CommentType[];
  cities: string[];
};

export default function App(props: AppProps): JSX.Element {
  const { comments, cities } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath.MainPage}>
          <Route index element={<MainPage cities={cities} />} />
          <Route path={AppPath.LoginPage} element={<LoginPage></LoginPage>} />
          <Route
            path={AppPath.FavoritesPage}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Yes}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppPath.Offer}>
            <Route path=':id' element={<RoomPage comments={comments} />} />
          </Route>
          <Route path={AppPath.Page404} element={<Page404></Page404>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
