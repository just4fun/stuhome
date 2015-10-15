import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC
} from '../constants/ActionTypes';

const API_ROOT = 'http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=';

function requestTopic() {
  return {
    type: REQUEST_TOPIC
  };
}

function receiveTopic(topics) {
  return {
    type: RECEIVE_TOPIC,
    topics
  };
}

export function fetchTopics(sortType = 'all', pageSize = 20) {
  return dispatch => {
    dispatch(requestTopic());
    return fetch(API_ROOT + `forum/topiclist&sortby=${sortType}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopic(json)));
  };
}
