import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise, of, concat } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import {
  FORUMLIST_FETCH,
  fetchForumListRequest,
  fetchForumListSuccess,
  fetchForumListFailure
} from './forumList.ducks';
import api from '~/services/api';
import cacheManager from '~/services/cacheManager';

const fetchForumList = (action$, state$) => action$.pipe(
  ofType(FORUMLIST_FETCH),
  filter(action => cacheManager.shouldFetchList(state$.value, 'forumList', action.payload.boardId)),
  mergeMap(action =>
    concat(
      of(fetchForumListRequest(action.payload)),
      fromPromise(api.fetchForumList(action.payload)).pipe(
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
      )
    )
  )
);

export default combineEpics(
  fetchForumList
);
