import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import {
  SEARCHLIST_FETCH,
  fetchSearchListSuccess,
  fetchSearchListFailure
} from './searchList.ducks';
import api from '~/services/api';

const fetchSearchList = (action$) => action$.pipe(
  ofType(SEARCHLIST_FETCH),
  mergeMap(action => api.fetchSearchList(action.payload)
    .then(({
      data,
      error
    }) => {
      if (!error) {
        return fetchSearchListSuccess(data);
      } else {
        return fetchSearchListFailure(error);
      }
    })
  )
);

export default combineEpics(
  fetchSearchList
);
