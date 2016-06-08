import { API_ROOT } from '../config';
import { fetchWithToken } from '../utils/app';
import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  REQUEST_SUBFORUMLIST,
  RECEIVE_FORUMLIST,
} from '../constants/ActionTypes';

const API_PATH = 'forum/forumlist';

function requestForumList() {
  return {
    type: REQUEST_FORUMLIST
  };
}

function requestSubForumList() {
  return {
    type: REQUEST_SUBFORUMLIST
  };
}

function receiveForumList(forumList, { boardId }) {
  return {
    type: RECEIVE_FORUMLIST,
    forumList,
    boardId
  };
}

function fetchForumList(boardId) {
  return dispatch => {
    let shouldFetchTopForumList = boardId === 'all';
    dispatch(shouldFetchTopForumList ? requestForumList() : requestSubForumList());

    let requestUrl = API_ROOT + API_PATH;
    if (boardId && boardId !== 'all') {
      requestUrl += `&fid=${boardId}`;
    }

    return fetchWithToken(requestUrl, null, dispatch, receiveForumList, { boardId });
  };
}

function shouldFetchForumList(boardId, state) {
  const { forumList, didInvalidate } = state;

  if (!forumList.list[boardId] || !forumList.list[boardId].forumList.length) { return true; }

  if (forumList.isFetching) { return false; }

  return forumList.didInvalidate;
}

export function fetchForumListIfNeeded(boardId) {
  return (dispatch, getState) => {
    if (shouldFetchForumList(boardId, getState())) {
      return dispatch(fetchForumList(boardId));
    }
  };
}

export function invalidateForumList() {
  return {
    type: INVALIDATE_FORUMLIST
  };
}
