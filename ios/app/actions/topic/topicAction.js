import { AsyncStorage } from 'react-native';
import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC,
} from '../../constants/ActionTypes';
import { API_ROOT } from '../../config';

const TOPIC_API_PATH = 'forum/postlist';

function requestTopic(isEndReached) {
  return {
    type: REQUEST_TOPIC,
    isEndReached
  };
}

function receiveTopic(topicItem) {
  return {
    type: RECEIVE_TOPIC,
    topicItem
  };
}

export function fetchTopic(topicId, isEndReached = false, page = 1, pageSize = 5) {
  return dispatch => {
    dispatch(requestTopic(isEndReached));

    let requestUrl =
      API_ROOT +
      TOPIC_API_PATH +
      `&topicId=${topicId}` +
      `&page=${page}` +
      `&pageSize=${pageSize}`;
    return AsyncStorage.getItem('authrization')
      .then(authrization => {
        if (authrization) {
          authrization = JSON.parse(authrization);
          requestUrl +=
            `&accessToken=${authrization.token}` +
            `&accessSecret=${authrization.secret}`;
        }

        return fetch(requestUrl)
          .then(response => response.json())
          .then(json => dispatch(receiveTopic(json)));
      });
  };
}

export function resetTopic() {
  return {
    type: RESET_TOPIC
  };
}
