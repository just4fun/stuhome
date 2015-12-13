import { AsyncStorage } from 'react-native';
import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST,
} from '../../constants/ActionTypes';
import { API_ROOT } from '../../config';

const TOPICLIST_API_PATH = 'forum/topiclist';

function requestTopicList(isEndReached) {
  return {
    type: REQUEST_TOPICLIST,
    isEndReached
  };
}

function receiveTopicList(topicList, boardId) {
  return {
    type: RECEIVE_TOPICLIST,
    topicList,
    boardId
  };
}

function fetchTopicList(boardId, isEndReached = false, sortType = 'all', page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopicList(isEndReached));

    let requestUrl =
      API_ROOT +
      TOPICLIST_API_PATH +
      `&boardId=${boardId}` +
      `&sortby=${sortType}` +
      `&page=${page}` +
      `&pageSize=${pageSize}`;
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
          .then(json => dispatch(receiveTopicList(json, boardId)));
      });
  };
}

function shouldFetchTopicList(boardId, state) {
  const topicList = state.topicList;

  /**
   * in current implementation, we shared `TopicList` state in all components which
   * contains topic list, so for having a simple cache, we just cache topic list
   * for SAME forum. That said, if we access one forum, then change to another
   * forum, then change back, we also need to fetch topic list again.
   */
  if (boardId !== topicList.boardId) { return true; }

  if (!topicList.list.length) { return true; }

  if (topicList.isRefreshing || topicList.isEndReached) { return false; }

  return topicList.didInvalidate;
}

export function fetchTopicListIfNeeded(boardId, isEndReached, sortType, page, pageSize) {
  return (dispatch, getState) => {
    if (shouldFetchTopicList(boardId, getState())) {
      return dispatch(fetchTopicList(boardId, isEndReached, sortType, page, pageSize));
    }
  };
}

export function invalidateTopicList() {
  return {
    type: INVALIDATE_TOPICLIST
  };
}
