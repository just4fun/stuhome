import { API_ROOT, PLAT_TYPE } from '../../config';
import { getAppHashValue, fetchWithToken } from '../../utils/app';
import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC,
  START_PUBLISH,
  FINISH_PUBLISH,
  RESET_PUBLISH
} from '../../constants/ActionTypes';

const TOPIC_FETCH_API_PATH = 'forum/postlist';
const TOPIC_POST_API_PATH = 'forum/topicadmin';
const ACTIONS = {
  REPLY: 'reply',
  NEW: 'new'
};

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

export function fetchTopic(topicId, isEndReached = false, page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopic(isEndReached));

    let requestUrl = API_ROOT +
                     TOPIC_FETCH_API_PATH +
                     `&topicId=${topicId}` +
                     `&page=${page}` +
                     `&pageSize=${pageSize}`;

    return fetchWithToken(requestUrl, null, dispatch, receiveTopic);
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
  typeId,
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
        isQuote: +!!replyId,
        replyId: replyId,
        typeId: typeId,
        title: title,
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

function assembleFetchOptions(payload) {
  // check `tid` (aka `topicId`) for obtaining `action`
  let action = payload.body.json.tid ? ACTIONS.REPLY : ACTIONS.NEW;

  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: `act=${action}&json=${JSON.stringify(payload)}`
  };
}

export function publish(boardId, topicId, replyId, typeId, title, content) {
  return dispatch => {
    dispatch(startPublish());

    let requestUrl = API_ROOT +
                     TOPIC_POST_API_PATH +
                     `&apphash=${getAppHashValue()}` +
                     `&platType=${PLAT_TYPE}`;

    let payload = assemblePayload(boardId, topicId, replyId, typeId, title, content);
    let fetchOptions = assembleFetchOptions(payload);

    return fetchWithToken(requestUrl, fetchOptions, dispatch, finishPublish);
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
