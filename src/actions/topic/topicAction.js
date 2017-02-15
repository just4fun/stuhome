import { HOST, API_PREFIX, PLAT_TYPE } from '../../config';
import { getAppHashValue } from '../../utils/app';
import _request from '../../utils/request';
import {
  START_PUBLISH,
  FINISH_PUBLISH,
  RESET_PUBLISH,
  FAILURE_PUBLISH,

  START_REPLY,
  FINISH_REPLY,
  RESET_REPLY,
  FAILURE_REPLY,

  START_VOTE,
  FINISH_VOTE,
  RESET_VOTE,
  FAILURE_VOTE
} from '../../constants/ActionTypes';

const TOPIC_POST_API_PATH = 'forum/topicadmin';
const VOTE_API_PATH = 'forum/vote';

// ****************************************************

import { createAction } from 'redux-actions';

export const REQUEST = Symbol();
export const RESET = Symbol();
export const fetchTopic = createAction(REQUEST);
export const resetTopic = createAction(RESET);

export const REQUEST_STARTED = Symbol();
export const REQUEST_COMPELTED = Symbol();
export const REQUEST_FAILED = Symbol();
export const request = createAction(REQUEST_STARTED);
// return 2nd argument as `meta` field
export const success = createAction(REQUEST_COMPELTED, null, (...args) => args[1]);
export const failure = createAction(REQUEST_FAILED);

// ****************************************************

const ACTIONS = {
  REPLY: 'reply',
  NEW: 'new'
};

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

function getFetchOptions(body) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  };
}

export function submit(boardId, topicId, replyId, typeId, title, content) {
  return dispatch => {
    let startAction = null;
    let finishAction = null;
    let failureAction = null;

    let url = HOST +
              API_PREFIX +
              TOPIC_POST_API_PATH +
              `&apphash=${getAppHashValue()}` +
              `&platType=${PLAT_TYPE}`;
    let payload = assemblePayload(boardId, topicId, replyId, typeId, title, content);
    // check `tid` (aka `topicId`) for obtaining `action`
    let action = payload.body.json.tid ? ACTIONS.REPLY : ACTIONS.NEW;

    if (action === ACTIONS.REPLY) {
      startAction = startReply;
      finishAction = finishReply;
      failureAction = failureReply;
    } else {
      startAction = startPublish;
      finishAction = finishPublish;
      failureAction = failurePublish;
    }
    dispatch(startAction());
    let body = `act=${action}&json=${JSON.stringify(payload)}`;
    let fetchOptions = getFetchOptions(body);

    return _request({
      url,
      fetchOptions,
      successCallback: data => dispatch(finishAction(data)),
      failureCallback: () => dispatch(failureAction())
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

function failurePublish() {
  return {
    type: FAILURE_PUBLISH
  };
}

export function resetPublish() {
  return {
    type: RESET_PUBLISH
  };
}

export function publishVote(topicId, voteIds) {
  return dispatch => {
    dispatch(startVote());

    let url = HOST + API_PREFIX + VOTE_API_PATH;
    let body = `tid=${topicId}&options=${voteIds}`;
    let fetchOptions = getFetchOptions(body);

    return _request({
      url,
      fetchOptions,
      successCallback: data => dispatch(finishVote(data)),
      failureCallback: () => dispatch(failureVote())
    });
  };
}

function startVote() {
  return {
    type: START_VOTE
  };
}

function finishVote(response) {
  return {
    type: FINISH_VOTE,
    response
  };
}

function failureVote() {
  return {
    type: FAILURE_VOTE
  };
}

export function resetVote() {
  return {
    type: RESET_VOTE
  };
}

function startReply() {
  return {
    type: START_REPLY
  };
}

function finishReply(response) {
  return {
    type: FINISH_REPLY,
    response
  };
}

function failureReply() {
  return {
    type: FAILURE_REPLY
  };
}

export function resetReply() {
  return {
    type: RESET_REPLY
  };
}
