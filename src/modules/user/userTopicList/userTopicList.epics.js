import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise, of, concat } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import {
  USERTOPICLIST_FETCH,
  fetchUserTopicListRequest,
  fetchUserTopicListSuccess,
  fetchUserTopicListFailure
} from './userTopicList.ducks';
import api from '~/services/api';
import cacheManager from '~/services/cacheManager';

const fetchUserTopicList = (action$, state$) => action$.pipe(
  ofType(USERTOPICLIST_FETCH),
  filter(action => {
    const { userId, type } = action.payload;
    return cacheManager.shouldFetchList(state$.value, 'userTopicList', userId, type);
  }),
  mergeMap(action =>
    concat(
      of(fetchUserTopicListRequest(action.payload)),
      fromPromise(api.fetchUserTopicList(action.payload)).pipe(
        map(({
          data,
          error
        }) => {
          if (!error) {
            return fetchUserTopicListSuccess(data, action.payload);
          } else {
            return fetchUserTopicListFailure(error, action.payload);
          }
        })
      )
    )
  )
);

export default combineEpics(
  fetchUserTopicList
);
