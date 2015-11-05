import { AsyncStorage } from 'react-native';
import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST,

  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC
} from '../constants/ActionTypes';
import { API_ROOT } from '../config';

const TOPICLIST_API_PATH = 'forum/topiclist';
const TOPIC_API_PATH = 'forum/postlist';

function requestTopicList() {
  return {
    type: REQUEST_TOPICLIST
  };
}

function receiveTopicList(topicList) {
  return {
    type: RECEIVE_TOPICLIST,
    topicList
  };
}

function fetchTopicList(sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopicList());
    return fetch(API_ROOT + TOPICLIST_API_PATH + `&sortby=${sortType}&page=${page}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopicList(json)));
  };
}

function shouldFetchTopicList(state) {
  const topicList = state.topicList;

  if (!topicList.list.length) { return true; }

  if (topicList.isFetching) { return false; }

  return topicList.didInvalidate;
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

function requestTopic() {
  return {
    type: REQUEST_TOPIC
  };
}

function receiveTopic(topicItem) {
  return {
    type: RECEIVE_TOPIC,
    topicItem
  };
}

export function fetchTopic(topicId) {
  return dispatch => {
    dispatch(requestTopic());

    let requestUrl = API_ROOT + TOPIC_API_PATH + `&topicId=${topicId}`;
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
