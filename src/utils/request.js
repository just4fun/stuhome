import {
  AsyncStorage
} from 'react-native';

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
        .then(json => dispatch(fetchSuccessCallbackAction(json, fetchSuccessCallbackParameter)));
    });
}
