import { take, fork, select } from 'redux-saga/effects';
import * as topicListActions from '../actions/topic/topicListAction';
import cacheManager from '../services/cacheManager';
import { fetchResource } from '../utils/sagaHelper';
import api from '../services/api';

const fetchTopicListApi = fetchResource.bind(null, topicListActions, api.fetchTopicList);

function* watchTopicList() {
  while(true) {
    const action = yield take(topicListActions.REQUEST);
    yield fork(fetchTopicList, action.payload);
  }
}

function* fetchTopicList(payload) {
  const state = yield select();

  if (cacheManager.shouldFetchList(state, 'topicList', payload.boardId)) {
    yield fork(fetchTopicListApi, payload);
  }
}

export default function* rootSaga() {
  yield fork(watchTopicList);
}
