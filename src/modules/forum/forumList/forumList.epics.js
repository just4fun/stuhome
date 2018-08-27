import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  FORUMLIST_FETCH,
  fetchForumListSuccess,
  fetchForumListFailure
} from './forumList.ducks';
import api from '~/services/api';

const fetchForumList = (action$) => action$.pipe(
  ofType(FORUMLIST_FETCH),
  mergeMap(action => fromPromise(api.fetchForumList(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchForumListSuccess(data, action.payload);
      } else {
        return fetchForumListFailure(error, action.payload);
      }
    })
  ))
);

export default combineEpics(
  fetchForumList
);
