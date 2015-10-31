import { AsyncStorage } from 'react-native';
import {
  INVALIDATE_FORUM,
  REQUEST_FORUM,
  RECEIVE_FORUM,
} from '../constants/ActionTypes';
import { API_ROOT } from '../config';

const API_PATH = 'forum/forumlist';

function requestForum() {
  return {
    type: REQUEST_FORUM
  };
}

function receiveForum(forum) {
  return {
    type: RECEIVE_FORUM,
    forum
  };
}

function fetchForum() {
  return dispatch => {
    dispatch(requestForum());

    return AsyncStorage.multiGet([
        'authrization.token',
        'authrization.secret'
      ])
      .then(authrization => {
        let requestUrl = API_ROOT + API_PATH;
        if (authrization) {
          requestUrl +=
            `&accessToken=${authrization[0][1]}` +
            `&accessSecret=${authrization[1][1]}`;
        }

        return fetch(requestUrl)
          .then(response => response.json())
          .then(json => dispatch(receiveForum(json)));
      });
  };
}

function shouldFetchForum(state) {
  const { forum, didInvalidate } = state;

  if (!forum.list.length) { return true; }

  if (forum.isFetching) { return false; }

  return forum.didInvalidate;
}

export function fetchForumIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchForum(getState())) {
      return dispatch(fetchForum());
    }
  };
}

export function invalidateForum() {
  return {
    type: INVALIDATE_FORUM
  };
}
