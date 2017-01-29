import { HOST, API_PREFIX } from '../../config';
import request from '../../utils/request';
import cacheManager from '../../services/cacheManager';
import {
  INVALIDATE_NOTIFYLIST,
  REQUEST_NOTIFYLIST_AT,
  REQUEST_NOTIFYLIST_REPLY,
  RECEIVE_NOTIFYLIST,
  FAILURE_NOTIFYLIST
} from '../../constants/ActionTypes';

const API_PATH = 'message/notifylist';

function requestNotifyAtList(isEndReached) {
  return {
    type: REQUEST_NOTIFYLIST_AT,
    isEndReached
  };
}

function requestNotifyReplyList(isEndReached) {
  return {
    type: REQUEST_NOTIFYLIST_REPLY,
    isEndReached
  };
}

function receiveNotifyList(notifyList, { notifyType }) {
  return {
    type: RECEIVE_NOTIFYLIST,
    notifyList,
    notifyType
  };
}

function failureNotifyList() {
  return {
    type: FAILURE_NOTIFYLIST
  };
}

function fetchNotifyList(notifyType, isEndReached = false, page = 1, pageSize = 20) {
  return dispatch => {
    if (notifyType === 'at') {
      dispatch(requestNotifyAtList(isEndReached));
    } else {
      dispatch(requestNotifyReplyList(isEndReached));
    }

    let url = HOST +
              API_PREFIX +
              API_PATH +
              `&type=${notifyType}` +
              `&page=${page}` +
              `&pageSize=${pageSize}`;

    return request({
      url,
      successCallback: data => dispatch(receiveNotifyList(data, { notifyType })),
      failureCallback: () => dispatch(failureNotifyList())
    });
  };
}

export function fetchNotifyListIfNeeded(notifyType, isEndReached, page, pageSize) {
  return (dispatch, getState) => {
    if (cacheManager.shouldFetchList(getState(), 'notifyList', notifyType)) {
      return dispatch(fetchNotifyList(notifyType, isEndReached, page, pageSize));
    }
  };
}

export function invalidateNotifyList() {
  return {
    type: INVALIDATE_NOTIFYLIST
  };
}
