import { API_ROOT } from '../config';
import { fetchWithToken } from '../utils/app';
import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  RECEIVE_FORUMLIST,
} from '../constants/ActionTypes';

const API_PATH = 'forum/forumlist';

function requestForumList() {
  return {
    type: REQUEST_FORUMLIST
  };
}

function receiveForumList(forumList) {
  return {
    type: RECEIVE_FORUMLIST,
    forumList
  };
}

function fetchForumList() {
  return dispatch => {
    dispatch(requestForumList());

    let requestUrl = API_ROOT + API_PATH;

    return fetchWithToken(requestUrl, null, dispatch, receiveForumList);
  };
}

function shouldFetchForumList(state) {
  const { forumList, didInvalidate } = state;

  if (!forumList.list.length) { return true; }

  if (forumList.isFetching) { return false; }

  return forumList.didInvalidate;
}

export function fetchForumListIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchForumList(getState())) {
      return dispatch(fetchForumList());
    }
  };
}

export function invalidateForumList() {
  return {
    type: INVALIDATE_FORUMLIST
  };
}
