import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  placesCount: number;
}

export default function App(props: AppProps): JSX.Element {
  const {placesCount} = props;
  return <MainPage placesCount = {placesCount} />;
}
