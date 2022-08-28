import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { getOffer } from '../../store/action-creaters-middleware';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { spinnerEnabled } from '../../store/slices/spinner-slice/spinner-slice';
import RoomMain from '../../components/room-main/room-main';
import { getInteger } from '../../util';
import { shallowEqual } from 'react-redux';
import { spinnerStatus } from '../../store/selectors/selectors';

export default function RoomPage(): JSX.Element {
  const { id } = useParams();
  const spinnerDisabled = useAppSelector(spinnerStatus, shallowEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOffer(getInteger(id)));
    return () => {
      dispatch(spinnerEnabled());
    };
  }, [id, dispatch]);

  return (
    <div className='page'>
      <Header isLoginPage={false} />
      {spinnerDisabled ? <RoomMain /> : <Spinner />}
    </div>
  );
}
