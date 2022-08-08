import {Navigate} from 'react-router-dom';
import {AppPath, AuthorizationStatus} from '../../settings';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Yes
      ? children
      : <Navigate to={AppPath.LoginPage} />
  );
}
