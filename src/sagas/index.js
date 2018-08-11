import { AsyncStorage } from 'react-native';
import { take, fork, select, put, call } from 'redux-saga/effects';

import * as authorizeActions from '~/actions/authorizeAction';
import * as topicListActions from '~/common/modules/topicList/topicList.ducks';
import * as userTopicListActions from '~/actions/user/topicListAction';
import * as forumListActions from '~/common/modules/forumList/forumList.ducks';
import * as notifyListActions from '~/actions/message/notifyListAction';
import * as searchActions from '~/actions/topic/searchAction';
import * as topicActions from '~/actions/topic/topicAction';
import * as pmSessionListActions from '~/actions/message/pmSessionListAction';
import * as pmListActions from '~/actions/message/pmListAction';
import * as sendActions from '~/actions/message/sendAction';
import * as alertActions from '~/actions/message/alertAction';
import * as settingsActions from '~/common/modules/settings/settings.ducks';
import * as userActions from '~/actions/user/userAction';
import * as friendListActions from '~/actions/user/friendListAction';

import cacheManager from '~/services/cacheManager';
import { fetchResource } from '~/utils/sagaHelper';
import api from '~/services/api';

const fetchLoginUserApi = fetchResource.bind(null, authorizeActions, api.fetchLoginUser);
const fetchTopicListApi = fetchResource.bind(null, topicListActions, api.fetchTopicList);
const fetchUserTopicListApi = fetchResource.bind(null, userTopicListActions, api.fetchUserTopicList);
const fetchForumListApi = fetchResource.bind(null, forumListActions, api.fetchForumList);
const fetchNotifyListApi = fetchResource.bind(null, notifyListActions, api.fetchNotifyList);
const fetchSearchListApi = fetchResource.bind(null, searchActions, api.fetchSearchList);
const fetchTopicApi = fetchResource.bind(null, topicActions, api.fetchTopic);
const fetchPmSessionListApi = fetchResource.bind(null, pmSessionListActions, api.fetchPmSessionList);
const fetchPmListApi = fetchResource.bind(null, pmListActions, api.fetchPmList);
const sendMessageApi = fetchResource.bind(null, sendActions, api.sendMessage);
const fetchAlertsApi = fetchResource.bind(null, alertActions, api.fetchAlerts);
const fetchUserApi = fetchResource.bind(null, userActions, api.fetchUser);
const fetchFriendListApi = fetchResource.bind(null, friendListActions, api.fetchFriendList);

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

// settings sagas

function* watchRetrieveSettings() {
  while(true) {
    yield take(settingsActions.SETTINGS_RETRIEVE);
    let settings = yield call(retrieveSettingsFromStorage);

    if (settings) {
      settings = JSON.parse(settings);
      yield put(settingsActions.storeSettingsToRedux(settings));
    }
  }
}

function retrieveSettingsFromStorage() {
  return new Promise(resolve => AsyncStorage.getItem('settings').then(resolve));
}

function* watchStoreSettings() {
  while(true) {
    const { payload } = yield take(settingsActions.SETTINGS_STORE);
    // get old settings
    let settings = yield call(retrieveSettingsFromStorage);
    // merge with new settings
    let newSettings = Object.assign({}, JSON.parse(settings), payload);
    // store new settings in storage
    yield call(storeSettingsToStorage, JSON.stringify(newSettings));
    // update redux store
    yield put(settingsActions.storeSettingsToRedux(newSettings));
  }
}

function storeSettingsToStorage(settings) {
  return new Promise(resolve => AsyncStorage.setItem('settings', settings).then(resolve));
}

// topic list sagas

function* watchTopicList() {
  while(true) {
    const { payload } = yield take(topicListActions.TOPIC_LIST_FETCH);
    yield fork(fetchTopicList, payload);
  }
}

function* fetchTopicList(payload) {
  const state = yield select();
  const { boardId, sortType } = payload;

  if (cacheManager.shouldFetchList(state, 'topicList', boardId, sortType)) {
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
    const { payload } = yield take(forumListActions.FORUM_LIST_FETCH);
    yield fork(fetchForumList, payload);
  }
}

function* fetchForumList(payload) {
  const state = yield select();

  if (cacheManager.shouldFetchList(state, 'forumList', payload.boardId)) {
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
  // const state = yield select();

  // Let user fetch notifications immediately.

  // if (cacheManager.shouldFetchList(state, 'notifyList', payload.notifyType)) {
    yield fork(fetchNotifyListApi, payload);
  // }
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

// pm session list sagas

function* watchPmSessionList() {
  while(true) {
    const { payload } = yield take(pmSessionListActions.REQUEST);
    yield fork(fetchPmSessionList, payload);
  }
}

function* fetchPmSessionList(payload) {
  const state = yield select();

  // Let user fetch private messages immediately.

  // if (cacheManager.shouldFetchList(state, 'pmSessionList')) {
    yield fork(fetchPmSessionListApi, payload);
  // }
}

// pm list sagas

function* watchPmList() {
  while(true) {
    const { payload } = yield take(pmListActions.REQUEST);
    yield fork(fetchPmListApi, payload);
  }
}

// send pm sagas

function* watchSendMessage() {
  while(true) {
    const { payload } = yield take(sendActions.REQUEST);
    yield fork(sendMessageApi, payload);
  }
}

// alerts sagas

function* watchAlerts() {
  while(true) {
    const { payload } = yield take(alertActions.REQUEST);
    yield fork(fetchAlertsApi, payload);
  }
}

// users sagas

function* watchUsers() {
  while(true) {
    const { payload } = yield take(userActions.REQUEST);
    yield fork(fetchUserApi, payload);
  }
}

// friend list sagas

function* watchFriendList() {
  while(true) {
    const { payload } = yield take(friendListActions.REQUEST);
    yield fork(fetchFriendList, payload);
  }
}

function* fetchFriendList(payload) {
  const state = yield select();

  if (cacheManager.shouldFetchList(state, 'friendList')) {
    yield fork(fetchFriendListApi, payload);
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
  yield fork(watchPmSessionList);
  yield fork(watchPmList);
  yield fork(watchSendMessage);
  yield fork(watchAlerts);
  yield fork(watchRetrieveSettings);
  yield fork(watchStoreSettings);
  yield fork(watchUsers);
  yield fork(watchFriendList);
}
