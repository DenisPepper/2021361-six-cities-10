import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Page404 from '../../pages/404-page/404-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import RoomPage from '../../pages/room-page/room-page';

type AppProps = {
  placesCount: number;
  rooms: number[];
};

export default function App(props: AppProps): JSX.Element {
  const { placesCount, rooms } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage roomsCount={placesCount}></MainPage>} />
          <Route path='login' element={<LoginPage></LoginPage>}/>
          <Route path='favorites' element={<FavoritesPage></FavoritesPage>} />
          <Route path='offer/'>
            <Route path=':id' element={<RoomPage rooms={rooms}></RoomPage>} />
          </Route>
          <Route path='*' element={<Page404></Page404>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
