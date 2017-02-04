import { createAction } from 'redux-actions';

export const REQUEST = 'REQUEST';
export const INVALIDATE = 'INVALIDATE';
export const RESET = 'RESET';
export const fetchTopicList = createAction(REQUEST);
export const invalidateTopicList = createAction(INVALIDATE);
export const resetTopicList = createAction(RESET);

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_COMPELTED = 'REQUEST_COMPELTED';
export const REQUEST_FAILED = 'REQUEST_COMPELTED';
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED);
