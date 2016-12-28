import { HOST, API_PREFIX } from '../config';
import request from '../utils/request';
import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  REQUEST_SUBFORUMLIST,
  RECEIVE_FORUMLIST,
  FAILURE_FORUMLIST
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

function failureForumList() {
  return {
    type: FAILURE_FORUMLIST
  };
}

function fetchForumList(boardId) {
  return dispatch => {
    let shouldFetchTopForumList = boardId === 'all';
    dispatch(shouldFetchTopForumList ? requestForumList() : requestSubForumList());

    let url = HOST + API_PREFIX + API_PATH;
    if (boardId && boardId !== 'all') {
      url += `&fid=${boardId}`;
    }

    return request({
      url,
      successCallback: data => dispatch(receiveForumList(data, { boardId })),
      failureCallback: () => dispatch(failureForumList())
    });
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
