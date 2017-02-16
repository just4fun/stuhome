import { AsyncStorage } from 'react-native';
import { take, fork, select, put, call } from 'redux-saga/effects';

import * as authorizeActions from '../actions/authorizeAction';
import * as topicListActions from '../actions/topic/topicListAction';
import * as userTopicListActions from '../actions/user/topicListAction';
import * as forumListActions from '../actions/forumAction';
import * as notifyListActions from '../actions/message/notifyListAction';
import * as searchActions from '../actions/topic/searchAction';
import * as topicActions from '../actions/topic/topicAction';
import * as voteActions from '../actions/topic/voteAction';

import cacheManager from '../services/cacheManager';
import { fetchResource } from '../utils/sagaHelper';
import api from '../services/api';

const fetchLoginUserApi = fetchResource.bind(null, authorizeActions, api.fetchLoginUser);
const fetchTopicListApi = fetchResource.bind(null, topicListActions, api.fetchTopicList);
const fetchUserTopicListApi = fetchResource.bind(null, userTopicListActions, api.fetchUserTopicList);
const fetchForumListApi = fetchResource.bind(null, forumListActions, api.fetchForumList);
const fetchNotifyListApi = fetchResource.bind(null, notifyListActions, api.fetchNotifyList);
const fetchSearchListApi = fetchResource.bind(null, searchActions, api.fetchSearchList);
const fetchTopicApi = fetchResource.bind(null, topicActions, api.fetchTopic);
const publishTopicVoteApi = fetchResource.bind(null, voteActions, api.publishVote);

// user login sagas

function* watchRetrieveUser() {
  while(true) {
    yield take(authorizeActions.RETRIEVE);
    const authrization = yield call(getUserFromStorage);

    if (authrization) {
      const user = JSON.parse(authrization);
      yield put(authorizeActions.setAuthrization(user));
    }
  }
}

// how to use `yield` inside callback?
// https://github.com/redux-saga/redux-saga/issues/508
function getUserFromStorage() {
  return new Promise(resolve => AsyncStorage.getItem('authrization').then(resolve));
}

function* watchLogin() {
  while(true) {
    const { payload } = yield take(authorizeActions.REQUEST);
    yield fork(fetchLoginUserApi, payload);
  }
}

// topic list sagas

function* watchTopicList() {
  while(true) {
    const { payload } = yield take(topicListActions.REQUEST);
    yield fork(fetchTopicList, payload);
  }
}

function* fetchTopicList(payload) {
  const state = yield select();

  if (cacheManager.shouldFetchList(state, 'topicList', payload.boardId)) {
    yield fork(fetchTopicListApi, payload);
  }
}

// user topic list sags

function* watchUserTopicList() {
  while(true) {
    const { payload } = yield take(userTopicListActions.REQUEST);
    yield fork(fetchUserTopicList, payload);
  }
}

function* fetchUserTopicList(payload) {
  const state = yield select();
  const { userId, type } = payload;

  if (cacheManager.shouldFetchList(state, 'userTopicList', userId, type)) {
    yield fork(fetchUserTopicListApi, payload);
  }
}

// forum list sagas

function* watchForumList() {
  while(true) {
    const { payload } = yield take(forumListActions.REQUEST);
    yield fork(fetchForumList, payload);
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

// notify list sagas

function* watchNotifyList() {
  while(true) {
    const { payload } = yield take(notifyListActions.REQUEST);
    yield fork(fetchNotifyList, payload);
  }
}

function* fetchNotifyList(payload) {
  const state = yield select();

  if (cacheManager.shouldFetchList(state, 'notifyList', payload.notifyType)) {
    notifyListActions.request = payload.notifyType === 'at'
                              ? notifyListActions.requestAtList
                              : notifyListActions.requestReplyList;
    yield fork(fetchNotifyListApi, payload);
  }
}

// search list sagas

function* watchSearchList() {
  while(true) {
    const { payload } = yield take(searchActions.REQUEST);
    yield fork(fetchSearchListApi, payload);
  }
}

// topic sagas

function* watchTopic() {
  while(true) {
    const { payload } = yield take(topicActions.REQUEST);
    yield fork(fetchTopicApi, payload);
  }
}

// vote sagas

function* watchTopicVote() {
  while(true) {
    const { payload } = yield take(voteActions.REQUEST);
    yield fork(publishTopicVoteApi, payload);
  }
}

export default function* rootSaga() {
  yield fork(watchRetrieveUser);
  yield fork(watchLogin);
  yield fork(watchTopicList);
  yield fork(watchUserTopicList);
  yield fork(watchForumList);
  yield fork(watchNotifyList);
  yield fork(watchSearchList);
  yield fork(watchTopic);
  yield fork(watchTopicVote);
}
