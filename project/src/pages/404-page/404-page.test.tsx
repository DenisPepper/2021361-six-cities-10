import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Page404 from './404-page';

describe('Page404', () => {
  it('render', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Page404 />
      </HistoryRouter>
    );

    const a = screen.getByText('Ошибка 404. Страница не найдена.');
    const b = screen.getByText('Главная');
    expect(a).toBeInTheDocument();
    expect(b).toBeInTheDocument();
  });
});
