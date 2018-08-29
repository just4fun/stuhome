import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  PMSESSIONLIST_FETCH,
  fetchPmSessionListSuccess,
  fetchPmSessionListFailure
} from './pmSessionList.ducks';
import api from '~/services/api';

const fetchPmSessionList = (action$) => action$.pipe(
  ofType(PMSESSIONLIST_FETCH),
  mergeMap(action => fromPromise(api.fetchPmSessionList(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchPmSessionListSuccess(data, action.payload);
      } else {
        return fetchPmSessionListFailure(error);
      }
    })
  ))
);

export default combineEpics(
  fetchPmSessionList
);
