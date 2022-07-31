import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppPath, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Page404 from '../../pages/404-page/404-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import RoomPage from '../../pages/room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import { OfferType } from '../../types/offer-type';
import {CommentType} from '../../types/comment-type';
import {MapSettings} from '../../types/map-types';

type AppProps = {
  rooms: OfferType[],
  comments: CommentType[],
  mapSettings: MapSettings,
};

export default function App(props: AppProps): JSX.Element {
  const { rooms, comments, mapSettings } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath.MainPage}>
          <Route
            index
            element={<MainPage mapSettings={mapSettings} rooms={rooms}></MainPage>}
          />
          <Route path={AppPath.LoginPage} element={<LoginPage></LoginPage>} />
          <Route
            path={AppPath.FavoritesPage}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Yes}>
                <FavoritesPage rooms={rooms.filter((room) => room.isFavorite)}/>
              </PrivateRoute>
            }
          />
          <Route path={AppPath.Offer}>
            <Route path=':id' element={<RoomPage rooms={rooms} comments={comments} mapSettings={mapSettings}></RoomPage>} />
          </Route>
          <Route path={AppPath.Page404} element={<Page404></Page404>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
