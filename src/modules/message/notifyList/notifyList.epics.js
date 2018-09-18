import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise, of, concat } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  NOTIFYLIST_FETCH,
  NOTIFYLIST_FETCH_SUCCESS,
  fetchNotifyListSuccess,
  fetchNotifyListFailure,
  fetchNotifyListSuccessfulCallback
} from './notifyList.ducks';
import api from '~/services/api';

const fetchNotifyList = (action$) => action$.pipe(
  ofType(NOTIFYLIST_FETCH),
  mergeMap(action => fromPromise(api.fetchNotifyList(action.payload)).pipe(
    mergeMap(({
      data,
      error
    }) => {
      if (!error) {
        return concat(
          of(fetchNotifyListSuccess(data, action.payload)),
          of(fetchNotifyListSuccessfulCallback(action.payload))
        );
      } else {
        return fetchNotifyListFailure(error, action.payload);
      }
    })
  ))
);

export default combineEpics(
  fetchNotifyList
);
