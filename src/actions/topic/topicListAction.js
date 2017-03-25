import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const INVALIDATE = Symbol();
export const RESET = Symbol();
export const fetchTopicList = createAction(REQUEST);
export const invalidateTopicList = createAction(INVALIDATE);
export const resetTopicList = createAction(RESET);

export const REQUEST_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED, null, (...args) => args[1]);
