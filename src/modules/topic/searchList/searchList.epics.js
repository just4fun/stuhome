import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import {
  SEARCHLIST_FETCH,
  SEARCHLIST_CANCEL,
  fetchSearchListSuccess,
  fetchSearchListFailure
} from './searchList.ducks';
import api from '~/services/api';

const fetchSearchList = (action$) => action$.pipe(
  ofType(SEARCHLIST_FETCH),
  mergeMap(action => fromPromise(api.fetchSearchList(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchSearchListSuccess(data);
      } else {
        return fetchSearchListFailure(error);
      }
    }),
    takeUntil(action$.pipe(
      ofType(SEARCHLIST_CANCEL)
    ))
  ))
);

export default combineEpics(
  fetchSearchList
);
