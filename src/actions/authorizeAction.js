import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const userLogin = createAction(REQUEST);

export const RETRIEVE = Symbol();
export const getUserFromStorage = createAction(RETRIEVE);

export const REQUEST_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED);

export const SET_AUTHRIZATION = Symbol();
export const RESET_AUTHRIZATION = Symbol();
export const RESET_AUTHRIZATION_RESULT = Symbol();
export const setAuthrization = createAction(SET_AUTHRIZATION);
export const resetAuthrization = createAction(RESET_AUTHRIZATION);
export const resetAuthrizationResult = createAction(RESET_AUTHRIZATION_RESULT);

export const REMOVE_CACHE = Symbol();
export const cleanCache = createAction(REMOVE_CACHE);
