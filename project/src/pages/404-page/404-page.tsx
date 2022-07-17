import React from 'react';
import {Link} from 'react-router-dom';

export default function Page404(): JSX.Element {
  return (
    <React.Fragment>
      <h1>Ошибка 404. Страница не найдена.</h1>
      <Link to='/'>
        Главная
      </Link>
    </React.Fragment>
  );
}
