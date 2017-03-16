import { AsyncStorage } from 'react-native';
import MessageBar from '../services/MessageBar';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return AsyncStorage.getItem('authrization')
    .then(authrization => {
      if (authrization) {
        let { token, secret } = JSON.parse(authrization);
        url += `&accessToken=${token}&accessSecret=${secret}`;
      }

      return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(error => {
          if (error && error.message === 'Network request failed') {
            MessageBar.show({
              message: '同学，网络出错啦！',
              type: 'warning'
            });
          }

          return { error };
        });
    });
}
