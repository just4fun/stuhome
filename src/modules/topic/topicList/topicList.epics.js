import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise, of, concat } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import {
  TOPICLIST_FETCH,
  fetchTopicListRequest,
  fetchTopicListSuccess,
  fetchTopicListFailure
} from './topicList.ducks';
import api from '~/services/api';
import cacheManager from '~/services/cacheManager';

const fetchTopicList = (action$, state$) => action$.pipe(
  ofType(TOPICLIST_FETCH),
  filter(action => {
    const { boardId, sortType } = action.payload;
    return cacheManager.shouldFetchList(state$.value, 'topicList', boardId, sortType);
  }),
  mergeMap(action =>
    concat(
      of(fetchTopicListRequest(action.payload)),
      fromPromise(api.fetchTopicList(action.payload)).pipe(
        map(({
          data,
          error
        }) => {
          if (!error) {
            return fetchTopicListSuccess(data, action.payload);
          } else {
            return fetchTopicListFailure(error, action.payload);
          }
        })
      )
    )
  )
);

export default combineEpics(
  fetchTopicList
);
