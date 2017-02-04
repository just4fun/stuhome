import request from '../utils/request';
import { API_ROOT } from '../config';

function callApi(endpoint) {
  return request(`${API_ROOT}${endpoint}`);
}

export default {
  fetchTopicList: ({
    boardId,
    sortType = 'all',
    page = 1,
    pageSize = 20
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
    page = 1,
    pageSize = 20
  }) => {
    return callApi(`message/notifylist&type=${notifyType}&page=${page}&pageSize=${pageSize}`);
  }
};
