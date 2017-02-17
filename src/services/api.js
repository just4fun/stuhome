import request from '../utils/request';
import { API_ROOT, PLAT_TYPE } from '../config';
import { getAppHashValue } from '../utils/app';

const DEFAULT_SORTTYPE = 'all';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGESIZE = 20;

const ACTIONS = {
  REPLY: 'reply',
  NEW: 'new'
};

/*********************************
 *
 * Private Help Methods
 *
 *********************************/

function callApi(endpoint, options) {
  return request(`${API_ROOT}${endpoint}`, options);
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

/*********************************
 *
 * API Methods
 *
 *********************************/

export default {
  fetchLoginUser: ({
    userName,
    password
  }) => {
    return callApi(`user/login&username=${userName}&password=${password}`);
  },

  fetchTopicList: ({
    boardId,
    sortType = DEFAULT_SORTTYPE,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/topiclist&boardId=${boardId}&sortby=${sortType}&page=${page}&pageSize=${pageSize}`);
  },

  fetchUserTopicList: ({
    userId,
    type = 'topic',
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`user/topiclist&uid=${userId}&type=${type}&page=${page}&pageSize=${pageSize}`);
  },

  fetchForumList: ({
    boardId
  }) => {
    let url = 'forum/forumlist';
    if (boardId && boardId !== 'all') {
      url += `&fid=${boardId}`;
    }

    return callApi(url);
  },

  fetchNotifyList: ({
    notifyType,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`message/notifylist&type=${notifyType}&page=${page}&pageSize=${pageSize}`);
  },

  fetchSearchList: ({
    keyword,
    sortType = DEFAULT_SORTTYPE,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/search&keyword=${keyword}&sortby=${sortType}&page=${page}&pageSize=${pageSize}`);
  },

  fetchTopic: ({
    topicId,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/postlist&topicId=${topicId}&page=${page}&pageSize=${pageSize}`);
  },

  publishVote: ({
    topicId,
    voteIds
  }) => {
    let body = `tid=${topicId}&options=${voteIds}`;
    let fetchOptions = getFetchOptions(body);
    return callApi('forum/vote', fetchOptions);
  },

  publishTopic: ({
    boardId,
    topicId,
    replyId,
    typeId,
    title,
    content
  }) => {
    // if there is `topicId`, it's `reply`, not `publish`
    let action = topicId ? ACTIONS.REPLY : ACTIONS.NEW;
    let payload = assemblePayload(boardId, topicId, replyId, typeId, title, content);
    let body = `act=${action}&json=${JSON.stringify(payload)}`;
    let fetchOptions = getFetchOptions(body);

    return callApi(`forum/topicadmin&apphash=${getAppHashValue()}&platType=${PLAT_TYPE}`, fetchOptions);
  },
};
