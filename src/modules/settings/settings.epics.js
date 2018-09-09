import { combineEpics, ofType } from 'redux-observable';
import { from as fromPromise, of, concat } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import { AsyncStorage } from 'react-native';
import {
  SETTINGS_RETRIEVE,
  SETTINGS_STORE,
  storeSettingsToRedux
} from './settings.ducks';
import api from '~/services/api';

const retrieveSettings = (action$) => action$.pipe(
  ofType(SETTINGS_RETRIEVE),
  mergeMap(action => fromPromise(AsyncStorage.getItem('settings')).pipe(
    filter(settings => settings),
    map(settings => {
      settings = JSON.parse(settings);
      return storeSettingsToRedux(settings);
    })
  ))
);

const storeSettings = (action$) => action$.pipe(
  ofType(SETTINGS_STORE),
  mergeMap(action => fromPromise(AsyncStorage.getItem('settings')).pipe(
    map(settings => {
      // Get new settings.
      let newSettings = Object.assign({}, JSON.parse(settings), action.payload);
      // Store new settings in storage.
      AsyncStorage.setItem('settings', JSON.stringify(newSettings));
      // Update redux store.
      return storeSettingsToRedux(newSettings);
    })
  ))
);

export default combineEpics(
  retrieveSettings,
  storeSettings
);
