import {
  INVALIDATE_TOPIC,
  REQUEST_TOPIC,
  RECEIVE_TOPIC
} from '../constants/ActionTypes';
import { API_ROOT } from '../config';

const API_PATH = 'forum/topiclist';

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
    return fetch(API_ROOT + API_PATH + `&sortby=${sortType}&page=${page}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopic(json)));
  };
}

function shouldFetchTopic(state) {
  const topic = state.topic;

  if (!topic.list.length) { return true; }

  if (topic.isFetching) { return false; }

  return topic.didInvalidate;
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
