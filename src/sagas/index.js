import { AsyncStorage } from 'react-native';
import { take, fork, select, put, call } from 'redux-saga/effects';

import * as notifyListActions from '~/modules/message/notifyList.ducks';
import * as pmSessionListActions from '~/modules/message/pmSessionList.ducks';
import * as alertActions from '~/modules/message/alert.ducks';

import cacheManager from '~/services/cacheManager';
import { fetchResource } from '~/utils/sagaHelper';
import api from '~/services/api';

const fetchNotifyListApi = fetchResource.bind(null, notifyListActions, api.fetchNotifyList);
const fetchPmSessionListApi = fetchResource.bind(null, pmSessionListActions, api.fetchPmSessionList);
const fetchAlertApi = fetchResource.bind(null, alertActions, api.fetchAlert);


// notify list sagas

function* watchNotifyList() {
  while(true) {
    const { payload } = yield take(notifyListActions.NOTIFY_LIST_FETCH);
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

// pm session list sagas

function* watchPmSessionList() {
  while(true) {
    const { payload } = yield take(pmSessionListActions.PM_SESSION_LIST_FETCH);
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

// alerts sagas

function* watchAlerts() {
  while(true) {
    const { payload } = yield take(alertActions.ALERT_FETCH);
    yield fork(fetchAlertApi, payload);
  }
}

export default function* rootSaga() {
  yield fork(watchNotifyList);
  yield fork(watchPmSessionList);
  yield fork(watchAlerts);
}
