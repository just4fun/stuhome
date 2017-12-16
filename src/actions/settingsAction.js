import { createAction } from 'redux-actions';

export const RETRIEVE = Symbol();
export const getSettingsFromStorage = createAction(RETRIEVE);

export const STORE = Symbol();
export const putSettingsToStorage = createAction(STORE);

export const DONE = Symbol();
export const done = createAction(DONE);
