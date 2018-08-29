import { AsyncStorage } from 'react-native';
import { take, fork, select, put, call } from 'redux-saga/effects';

import * as notifyListActions from '~/modules/message/notifyList.ducks';

import cacheManager from '~/services/cacheManager';
import { fetchResource } from '~/utils/sagaHelper';
import api from '~/services/api';

const fetchNotifyListApi = fetchResource.bind(null, notifyListActions, api.fetchNotifyList);


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

export default function* rootSaga() {
  yield fork(watchNotifyList);
}
