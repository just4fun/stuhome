import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  TOPIC_FETCH,
  fetchTopicSuccess,
  fetchTopicFailure
} from './topic.ducks';
import api from '~/services/api';

const fetchTopic = (action$) => action$.pipe(
  ofType(TOPIC_FETCH),
  mergeMap(action => fromPromise(api.fetchTopic(action.payload)).pipe(
    map(({
      data,
      error
    }) => {
      if (!error) {
        return fetchTopicSuccess(data, action.payload);
      } else {
        return fetchTopicFailure(error);
      }
    })
  ))
);

export default combineEpics(
  fetchTopic
);
