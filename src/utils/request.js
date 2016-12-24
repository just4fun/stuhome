import { AsyncStorage } from 'react-native';
import MessageBar from '../services/MessageBar';

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
            MessageBar.show({
              message: '同学，网络出错啦！',
              type: 'warning'
            });
          }

          failureCallback();
        });
    });
}
