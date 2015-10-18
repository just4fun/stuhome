import {
  INVALIDATE_TOPIC,
  REQUEST_TOPIC,
  RECEIVE_TOPIC
} from '../constants/ActionTypes';

const API_ROOT = 'http://bbs.uestc.edu.cn/mobcent/app/web/index.php?r=';

function requestTopic() {
  return {
    type: REQUEST_TOPIC
  };
}

function receiveTopic(topic) {
  return {
    type: RECEIVE_TOPIC,
    topic
  };
}

function fetchTopic(sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopic());
    return fetch(API_ROOT + `forum/topiclist&sortby=${sortType}&page=${page}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopic(json)));
  };
}

function shouldFetchTopic(state) {
  const { topic, isFetching, didInvalidate } = state;

  if (!topic.list.length) { return true; }

  if (isFetching) { return false; }

  return didInvalidate;
}

export function fetchTopicIfNeeded(sortType, page, pageSize) {
  return (dispatch, getState) => {
    if (shouldFetchTopic(getState())) {
      return dispatch(fetchTopic(sortType, page, pageSize));
    }
  };
}

export function invalidateTopic() {
  return {
    type: INVALIDATE_TOPIC
  };
}
