import { AsyncStorage } from 'react-native';
import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC,
  START_PUBLISH,
  FINISH_PUBLISH,
  RESET_PUBLISH
} from '../../constants/ActionTypes';
import { API_ROOT } from '../../config';
import { getAppHashValue } from '../../utils/app';

const TOPIC_FETCH_API_PATH = 'forum/postlist';
const TOPIC_POST_API_PATH = 'forum/topicadmin';

function requestTopic(isEndReached) {
  return {
    type: REQUEST_TOPIC,
    isEndReached
  };
}

function receiveTopic(topicItem) {
  return {
    type: RECEIVE_TOPIC,
    topicItem
  };
}

export function fetchTopic(topicId, isEndReached = false, page = 1, pageSize = 5) {
  return dispatch => {
    dispatch(requestTopic(isEndReached));

    let requestUrl =
      API_ROOT +
      TOPIC_FETCH_API_PATH +
      `&topicId=${topicId}` +
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
          .then(json => dispatch(receiveTopic(json)));
      });
  };
}

export function resetTopic() {
  return {
    type: RESET_TOPIC
  };
}

function assemblePayload(
  boardId,
  topicId,
  replyId,
  title,
  content
) {
  return {
    body: {
      json: {
        fid: boardId,
        tid: topicId,
        isAnonymous: 0,
        isOnlyAuthor: 0,
        isQuote: 0,
        replyId: replyId,
        title: null,
        content: JSON.stringify([
          {
            type: 0,
            infor: content
          }
        ])
      }
    }
  };
}

export function publishComment(boardId, topicId, replyId, title, content) {
  return dispatch => {
    dispatch(startPublish());

    let requestUrl = API_ROOT + TOPIC_POST_API_PATH + `&apphash=${getAppHashValue()}&platType=5`;
    let payload = assemblePayload(boardId, topicId, replyId, title, content);
    let fetchOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `act=reply&json=${JSON.stringify(payload)}`
    };
    return AsyncStorage.getItem('authrization')
      .then(authrization => {
        if (authrization) {
          authrization = JSON.parse(authrization);
          requestUrl +=
            `&accessToken=${authrization.token}` +
            `&accessSecret=${authrization.secret}`;
        }

        return fetch(requestUrl, fetchOptions)
        .then(response => response.json())
        .then(json => dispatch(finishPublish(json)));
      });
  };
}

function startPublish() {
  return {
    type: START_PUBLISH
  };
}

function finishPublish(response) {
  return {
    type: FINISH_PUBLISH,
    response
  };
}

export function resetPublish() {
  return {
    type: RESET_PUBLISH
  };
}
