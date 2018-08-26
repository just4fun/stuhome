import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import {
  TOPICLIST_FETCH,
  fetchTopicListSuccess,
  fetchTopicListFailure
} from './topicList.ducks';
import api from '~/services/api';

const fetchTopicList = (action$) => action$.pipe(
  ofType(TOPICLIST_FETCH),
  mergeMap(action => api.fetchTopicList(action.payload)
    .then(({
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
);

export default combineEpics(
  fetchTopicList
);
