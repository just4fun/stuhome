import { HOST, API_PREFIX } from '../../config';
import request from '../../utils/request';
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

function shouldFetchUserTopicList(userId, type, state) {
  let { userTopicList } = state;

  if (!userTopicList.list[userId] ||
      !userTopicList.list[userId][type] ||
      !userTopicList.list[userId][type].topicList.length) { return true; }

  if (userTopicList.isRefreshing || userTopicList.isEndReached) { return false; }

  return userTopicList.didInvalidate;
}

export function fetchUserTopicListIfNeeded(userId, isEndReached, type, page, pageSize) {
  return (dispatch, getState) => {
    if (shouldFetchUserTopicList(userId, type, getState())) {
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
