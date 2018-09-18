import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  FRIENDLIST_FETCH,
  fetchFriendListSuccess,
  fetchFriendListFailure
} from './friendList.ducks';
import api from '~/services/api';

const fetchFriendList = (action$) => action$.pipe(
  ofType(FRIENDLIST_FETCH),
  mergeMap(action => fromPromise(api.fetchFriendList(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchFriendListSuccess(data);
      } else {
        return fetchFriendListFailure(error);
      }
    })
  ))
);

export default combineEpics(
  fetchFriendList
);
