import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import {
  PMLIST_FETCH,
  PMLIST_CANCEL,
  fetchPmListSuccess,
  fetchPmListFailure
} from './pmList.ducks';
import api from '~/services/api';

const fetchPmList = (action$) => action$.pipe(
  ofType(PMLIST_FETCH),
  mergeMap(action => fromPromise(api.fetchPmList(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchPmListSuccess(data, action.payload);
      } else {
        return fetchPmListFailure(error);
      }
    }),
    takeUntil(action$.pipe(
      ofType(PMLIST_CANCEL)
    ))
  ))
);

export default combineEpics(
  fetchPmList
);
