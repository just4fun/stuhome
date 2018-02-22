import { call, put } from 'redux-saga/effects';

export function* fetchResource(resource, api, payload) {
  yield put(resource.request(payload));
  const { data, error } = yield call(api, payload);

  if (!error) {
    // The 2nd argument will be treated as `meta` field.
    yield put(resource.success(data, payload));
    if (resource.successfulCallback) {
      yield put(resource.successfulCallback(payload));
    }
  } else {
    yield put(resource.failure(error, payload));
  }
}
