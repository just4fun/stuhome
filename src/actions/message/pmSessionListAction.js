import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const INVALIDATE = Symbol();
export const MARK_PM_AS_READ = Symbol();
export const fetchPmSessionList = createAction(REQUEST);
export const invalidatePmSessionList = createAction(INVALIDATE);
export const markPmAsRead = createAction(MARK_PM_AS_READ);

export const REQUEST_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED, null, (...args) => args[1]);
