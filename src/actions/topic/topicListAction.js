import { HOST, API_PREFIX } from '../../config';
import request from '../../utils/request';
import cacheManager from '../../services/cacheManager';
import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST,
  RESET_TOPICLIST,
  FAILURE_TOPICLIST
} from '../../constants/ActionTypes';

const TOPICLIST_API_PATH = 'forum/topiclist';

function requestTopicList(isEndReached) {
  return {
    type: REQUEST_TOPICLIST,
    isEndReached
  };
}

function receiveTopicList(topicList, { boardId }) {
  return {
    type: RECEIVE_TOPICLIST,
    topicList,
    boardId
  };
}

function failureTopicList() {
  return {
    type: FAILURE_TOPICLIST
  };
}

function fetchTopicList(boardId, isEndReached = false, sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopicList(isEndReached));

    let url = HOST +
              API_PREFIX +
              TOPICLIST_API_PATH +
              `&boardId=${boardId}` +
              `&sortby=${sortType}` +
              `&page=${page}` +
              `&pageSize=${pageSize}`;

    return request({
      url,
      successCallback: data => dispatch(receiveTopicList(data, { boardId })),
      failureCallback: () => dispatch(failureTopicList())
    });
  };
}

export function fetchTopicListIfNeeded(boardId, isEndReached, sortType, page, pageSize) {
  return (dispatch, getState) => {
    if (cacheManager.shouldFetchList(getState(), 'topicList', boardId)) {
      return dispatch(fetchTopicList(boardId, isEndReached, sortType, page, pageSize));
    }
  };
}

export function invalidateTopicList() {
  return {
    type: INVALIDATE_TOPICLIST
  };
}

export function resetTopicList() {
  return {
    type: RESET_TOPICLIST
  };
}
