import { API_ROOT } from '../../config';
import { fetchWithToken } from '../../utils/request';
import {
  INVALIDATE_NOTIFYLIST,
  REQUEST_NOTIFYLIST_AT,
  REQUEST_NOTIFYLIST_REPLY,
  RECEIVE_NOTIFYLIST,
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

function fetchNotifyList(notifyType, isEndReached = false, page = 1, pageSize = 20) {
  return dispatch => {
    if (notifyType === 'at') {
      dispatch(requestNotifyAtList(isEndReached));
    } else {
      dispatch(requestNotifyReplyList(isEndReached));
    }

    let requestUrl = API_ROOT +
                     API_PATH +
                     `&type=${notifyType}` +
                     `&page=${page}` +
                     `&pageSize=${pageSize}`;

    return fetchWithToken(requestUrl, null, dispatch, receiveNotifyList, { notifyType });
  };
}

function shouldFetchNotifyList(notifyType, state) {
  const { notifyList, didInvalidate } = state;
  let isRefreshing = false;

  if (!notifyList.list[notifyType] || !notifyList.list[notifyType].notifyList.length) { return true; }

  if (notifyType === 'at') {
    isRefreshing = notifyList.isFetchingAtList;
  } {
    isRefreshing = notifyList.isFetchingReplyList;
  }

  if (notifyList.isRefreshing) { return false; }

  return notifyList.didInvalidate;
}

export function fetchNotifyListIfNeeded(notifyType, isEndReached, page, pageSize) {
  return (dispatch, getState) => {
    if (shouldFetchNotifyList(notifyType, getState())) {
      return dispatch(fetchNotifyList(notifyType, isEndReached, page, pageSize));
    }
  };
}

export function invalidateNotifyList() {
  return {
    type: INVALIDATE_NOTIFYLIST
  };
}
