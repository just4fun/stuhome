import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const INVALIDATE = Symbol();
export const fetchForumList = createAction(REQUEST);
export const invalidateForumList = createAction(INVALIDATE);

export const REQUEST_TOPFORUM_STARTED = Symbol();
export const REQUEST_SUBFORUM_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const requestTopForumList = createAction(REQUEST_TOPFORUM_STARTED);
export const requestSubForumList = createAction(REQUEST_SUBFORUM_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED);
