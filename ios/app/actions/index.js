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

function receiveTopic(topics) {
  return {
    type: RECEIVE_TOPIC,
    topics
  };
}

function fetchTopics(sortType = 'all', pageSize = 20) {
  return dispatch => {
    dispatch(requestTopic());
    return fetch(API_ROOT + `forum/topiclist&sortby=${sortType}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopic(json)));
  };
}

function shouldFetchTopics(state) {
  const { topics, isFetching, didInvalidate } = state;

  if (!topics.length) { return true; }

  if (isFetching) { return false; }

  return didInvalidate;
}

export function fetchTopicsIfNeeded(sortType, pageSize) {
  return (dispatch, getState) => {
    if (shouldFetchTopics(getState())) {
      return dispatch(fetchTopics(sortType, pageSize));
    }
  };
}

export function invalidateTopic() {
  return {
    type: INVALIDATE_TOPIC
  };
}
