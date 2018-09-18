import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  ALERT_FETCH,
  fetchAlertSuccess,
  fetchAlertFailure
} from './alert.ducks';
import api from '~/services/api';

const fetchAlert = (action$) => action$.pipe(
  ofType(ALERT_FETCH),
  mergeMap(action => fromPromise(api.fetchAlert(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchAlertSuccess(data);
      } else {
        return fetchAlertFailure(error);
      }
    })
  ))
);

export default combineEpics(
  fetchAlert
);
