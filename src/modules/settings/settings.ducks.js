import { createAction, handleActions } from 'redux-actions';

// *********************************
// Actions
// *********************************

export const SETTINGS_RETRIEVE = 'SETTINGS_RETRIEVE';
export const SETTINGS_STORE = 'SETTINGS_STORE';
export const SETTINGS_STORE_DONE = 'SETTINGS_STORE_DONE';

// *********************************
// Action Creators
// *********************************

export const retrieveSettingsFromStorage = createAction(SETTINGS_RETRIEVE);
export const storeSettingsToStorage = createAction(SETTINGS_STORE);
export const storeSettingsToRedux = createAction(SETTINGS_STORE_DONE);

// *********************************
// Reducer
// *********************************

const defaultSettingsState = {
  enableNotification: true,
  enablePublishDialog: false,
  enableNightMode: false,
  fontSize: 'small'
};

export default handleActions({
  [SETTINGS_STORE_DONE]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, defaultSettingsState);
