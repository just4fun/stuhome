import { HOST, API_PREFIX } from '../../config';
import request from '../../utils/request';
import cacheManager from '../../services/cacheManager';
import {
  INVALIDATE_USER_TOPICLIST,
  REQUEST_USER_TOPICLIST,
  RECEIVE_USER_TOPICLIST,
  RESET_USER_TOPICLIST,
  FAILURE_USER_TOPICLIST
} from '../../constants/ActionTypes';

const USER_TOPICLIST_API_PATH = 'user/topiclist';

function requestUserTopicList(isEndReached) {
  return {
    type: REQUEST_USER_TOPICLIST,
    isEndReached
  };
}

function receiveUserTopicList(userTopicList, { userId, type }) {
  return {
    type: RECEIVE_USER_TOPICLIST,
    userTopicList,
    userId,
    individualType: type
  };
}

function failureUserTopicList() {
  return {
    type: FAILURE_USER_TOPICLIST
  };
}

function fetchUserTopicList(userId, isEndReached = false, type = 'topic', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestUserTopicList(isEndReached));

    let url = HOST +
              API_PREFIX +
              USER_TOPICLIST_API_PATH +
              `&uid=${userId}` +
              `&type=${type}` +
              `&page=${page}` +
              `&pageSize=${pageSize}`;

    return request({
      url,
      successCallback: data => dispatch(receiveUserTopicList(data, { userId, type })),
      failureCallback: () => dispatch(failureUserTopicList())
    });
  };
}

export function fetchUserTopicListIfNeeded(userId, isEndReached, type, page, pageSize) {
  return (dispatch, getState) => {
    if (cacheManager.shouldFetchList(getState(), 'userTopicList', userId, type)) {
      return dispatch(fetchUserTopicList(userId, isEndReached, type, page, pageSize));
    }
  };
}

export function invalidateUserTopicList() {
  return {
    type: INVALIDATE_USER_TOPICLIST
  };
}

export function resetUserTopicList() {
  return {
    type: RESET_USER_TOPICLIST
  };
}
