import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const INVALIDATE = Symbol();
export const fetchNotifyList = createAction(REQUEST);
export const invalidateNotifyList = createAction(INVALIDATE);

export const REQUEST_AT_STARTED = Symbol();
export const REQUEST_REPLY_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const requestAtList = createAction(REQUEST_AT_STARTED);
export const requestReplyList = createAction(REQUEST_REPLY_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED);
