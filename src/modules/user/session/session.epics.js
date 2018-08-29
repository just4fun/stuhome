import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise, of, concat } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { AsyncStorage } from 'react-native';
import {
  LOGIN,
  SESSION_RETRIEVE,
  loginSuccess,
  loginFailure,
  setSession
} from './session.ducks';
import api from '~/services/api';

const login = (action$) => action$.pipe(
  ofType(LOGIN),
  mergeMap(action => fromPromise(api.login(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return loginSuccess(data);
      } else {
        return loginFailure(error);
      }
    })
  ))
);

const retrieveSession = (action$) => action$.pipe(
  ofType(SESSION_RETRIEVE),
  mergeMap(action => fromPromise(AsyncStorage.getItem('session')).pipe(
    map(session => {
      if (session) {
        session = JSON.parse(session);
        return setSession(session);
      }
    })
  ))
);

export default combineEpics(
  login,
  retrieveSession
);
