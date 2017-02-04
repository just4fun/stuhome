import { take, fork, select } from 'redux-saga/effects';
import * as topicListActions from '../actions/topic/topicListAction';
import * as forumListActions from '../actions/forumAction';
import cacheManager from '../services/cacheManager';
import { fetchResource } from '../utils/sagaHelper';
import api from '../services/api';

const fetchTopicListApi = fetchResource.bind(null, topicListActions, api.fetchTopicList);
const fetchForumListApi = fetchResource.bind(null, forumListActions, api.fetchForumList);

// topic list sagas

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

// forum list sagas

function* watchForumList() {
  while(true) {
    const action = yield take(forumListActions.REQUEST);
    yield fork(fetchForumList, action.payload);
  }
}

function* fetchForumList(payload) {
  const state = yield select();

  if (cacheManager.shouldFetchList(state, 'forumList', payload.boardId)) {
    forumListActions.request = payload.boardId === 'all'
                             ? forumListActions.requestTopForumList
                             : forumListActions.requestSubForumList;
    yield fork(fetchForumListApi, payload);
  }
}

export default function* rootSaga() {
  yield fork(watchTopicList);
  yield fork(watchForumList);
}
