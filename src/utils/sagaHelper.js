import { call, put } from 'redux-saga/effects';

export function* fetchResource(resource, api, payload) {
  yield put(resource.request(payload));
  const { data, error } = yield call(api, payload);

  if (!error) {
    // the 2nd argument will be treated as `meta` field
    yield put(resource.success(data, payload));
  } else {
    yield put(resource.failure(error, payload));
  }
}
