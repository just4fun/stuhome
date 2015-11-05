import { AsyncStorage } from 'react-native';
import {
  INVALIDATE_FORUMLIST,
  REQUEST_FORUMLIST,
  RECEIVE_FORUMLIST,
} from '../constants/ActionTypes';
import { API_ROOT } from '../config';

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
          .then(json => dispatch(receiveForumList(json)));
      });
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
