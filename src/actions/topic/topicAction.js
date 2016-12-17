import { API_ROOT, PLAT_TYPE } from '../../config';
import { getAppHashValue } from '../../utils/app';
import request from '../../utils/request';
import {
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
  RESET_TOPIC,
  FAILURE_TOPIC,

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

const TOPIC_FETCH_API_PATH = 'forum/postlist';
const TOPIC_POST_API_PATH = 'forum/topicadmin';
const VOTE_API_PATH = 'forum/vote';

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

function failureTopic() {
  return {
    type: FAILURE_TOPIC
  };
}

export function fetchTopic(topicId, isEndReached = false, page = 1, pageSize = 20) {
  return dispatch => {
    dispatch(requestTopic(isEndReached));

    let url = API_ROOT +
              TOPIC_FETCH_API_PATH +
              `&topicId=${topicId}` +
              `&page=${page}` +
              `&pageSize=${pageSize}`;

    return request({
      url,
      successCallback: data => dispatch(receiveTopic(data)),
      failureCallback: () => dispatch(failureTopic())
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

    let url = API_ROOT +
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
    let options = getFetchOptions(body);

    return request({
      url,
      options,
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

    let url = API_ROOT + VOTE_API_PATH;
    let body = `tid=${topicId}&options=${voteIds}`;
    let options = getFetchOptions(body);

    return request({
      url,
      options,
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
