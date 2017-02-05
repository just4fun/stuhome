import request from '../utils/request';
import { API_ROOT } from '../config';

const DEFAULT_SORTTYPE = 'all';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGESIZE = 20;

function callApi(endpoint) {
  return request(`${API_ROOT}${endpoint}`);
}

export default {
  fetchTopicList: ({
    boardId,
    sortType = DEFAULT_SORTTYPE,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/topiclist&boardId=${boardId}&sortby=${sortType}&page=${page}&pageSize=${pageSize}`);
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
  }
};
