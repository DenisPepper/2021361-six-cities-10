import { shallowEqual } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppPath, AuthorizationStatus } from '../../settings';
import { authStatus } from '../../store/selectors/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorized =
    useAppSelector(authStatus, shallowEqual) === AuthorizationStatus.Yes;

  return authorized ? children : <Navigate to={AppPath.LoginPage} />;
}
