import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { getOffer } from '../../store/action-creaters-middleware';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { spinnerEnabled } from '../../store/action-creaters';
import RoomMain from '../../components/room-main/room-main';
import { getInteger } from '../../util';

export default function RoomPage(): JSX.Element {
  const { id } = useParams();
  const spinnerDisabled = useAppSelector((store) => store.reducer.spinnerDisabled);
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
