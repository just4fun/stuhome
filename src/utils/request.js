import { AsyncStorage } from 'react-native';
import MessageBar from '~/services/MessageBar';

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

function handleError(error) {
  if (error) {
    if (error.message === 'Network request failed') {
      MessageBar.show({
        message: '请检查网络是否通畅',
        type: 'warning'
      });
    } else if (error.response && error.response.status >= 500) {
      MessageBar.show({
        message: '服务器开小差啦，请查看网页版能否登陆',
        type: 'warning'
      });
    }
  }

  return { error };
}

export default function request(url, options) {
  return AsyncStorage.getItem('session')
    .then(session => {
      if (session) {
        let { token, secret } = JSON.parse(session);
        url += `&accessToken=${token}&accessSecret=${secret}`;
      }

      return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(handleError);
    });
}
