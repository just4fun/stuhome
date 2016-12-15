import { AsyncStorage } from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';
import { failure } from '../actions/appAction';

export function fetchWithToken(
  requestUrl,
  fetchOptions,
  dispatch,
  fetchSuccessCallbackAction,
  fetchSuccessCallbackParameter) {
  return AsyncStorage.getItem('authrization')
    .then(authrization => {
      if (authrization) {
        authrization = JSON.parse(authrization);
        requestUrl += `&accessToken=${authrization.token}` +
                      `&accessSecret=${authrization.secret}`;
      }

      return fetch(requestUrl, fetchOptions)
        .then(response => response.json())
        .then(json => dispatch(fetchSuccessCallbackAction(json, fetchSuccessCallbackParameter)))
        .catch(error => {
          MessageBarManager.showAlert({
            viewTopOffset: 60,
            message: '同学，网络出错啦！',
            alertType: 'warning',
            messageStyle: { textAlign: 'center', color: 'white', fontSize: 16 }
          });

          dispatch(failure());
        });
    });
}
