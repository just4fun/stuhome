import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import {
  USER_FETCH,
  USER_CANCEL,
  fetchUserSuccess,
  fetchUserFailure
} from './user.ducks';
import api from '~/services/api';

const fetchUser = (action$) => action$.pipe(
  ofType(USER_FETCH),
  mergeMap(action => fromPromise(api.fetchUser(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchUserSuccess(data);
      } else {
        return fetchUserFailure(error);
      }
    }),
    takeUntil(action$.pipe(
      ofType(USER_CANCEL)
    ))
  ))
);

export default combineEpics(
  fetchUser
);
