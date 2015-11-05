import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST
} from '../constants/ActionTypes';
import { API_ROOT } from '../config';

const API_PATH = 'forum/topiclist';

function requestTopicList() {
  return {
    type: REQUEST_TOPICLIST
  };
}

function receiveTopicList(topic) {
  return {
    type: RECEIVE_TOPICLIST,
    topic
  };
}

function fetchTopicList(sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopicList());
    return fetch(API_ROOT + API_PATH + `&sortby=${sortType}&page=${page}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopicList(json)));
  };
}

function shouldFetchTopicList(state) {
  const topic = state.topic;

  if (!topic.list.length) { return true; }

  if (topic.isFetching) { return false; }

  return topic.didInvalidate;
}

export function fetchTopicListIfNeeded(sortType, page, pageSize) {
  return (dispatch, getState) => {
    if (shouldFetchTopicList(getState())) {
      return dispatch(fetchTopicList(sortType, page, pageSize));
    }
  };
}

export function invalidateTopicList() {
  return {
    type: INVALIDATE_TOPICLIST
  };
}
