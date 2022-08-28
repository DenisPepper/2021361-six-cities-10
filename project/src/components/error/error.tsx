import { shallowEqual } from 'react-redux';
import {useAppSelector} from '../../hooks';
import { appError } from '../../store/selectors/selectors';
import './error-message.css';

export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(appError, shallowEqual);
  return error ? <div className='error-message'>{error}</div> : null;
}

