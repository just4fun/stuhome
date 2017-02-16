import request from '../utils/request';
import { API_ROOT } from '../config';

const DEFAULT_SORTTYPE = 'all';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGESIZE = 20;

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
  }
};
