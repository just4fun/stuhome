import { AsyncStorage } from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';

export default function request(url, options) {
  let requestUrl = null;

  if (typeof url === 'object') {
    options = url;
    url = undefined;
  }

  options = options || {};
  requestUrl = url || options.url;

  let { successCallback, failureCallback, fetchOptions } = options;

  return AsyncStorage.getItem('authrization')
    .then(authrization => {
      if (authrization) {
        let { token, secret } = JSON.parse(authrization);
        requestUrl += `&accessToken=${token}` +
                      `&accessSecret=${secret}`;
      }

      return fetch(requestUrl, fetchOptions)
        .then(response => response.json())
        .then(json => successCallback(json))
        .catch(error => {
          if (error && error.message === 'Network request failed') {
            MessageBarManager.showAlert({
              viewTopOffset: 60,
              message: '同学，网络出错啦！',
              alertType: 'warning',
              messageStyle: { textAlign: 'center', color: 'white', fontSize: 16 }
            });
          }

          failureCallback();
        });
    });
}
