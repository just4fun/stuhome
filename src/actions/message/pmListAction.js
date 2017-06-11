import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const RESET = Symbol();
export const RESET_RESPONSE_STATUS = Symbol();
export const fetchPmList = createAction(REQUEST);
export const resetPmList = createAction(RESET);
export const resetPmListResponseStatus = createAction(RESET_RESPONSE_STATUS);

export const REQUEST_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED);
