import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import {AppPath, AuthorizationStatus} from '../../settings';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector((store) => store.reducer.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Yes
      ? children
      : <Navigate to={AppPath.LoginPage} />
  );
}
