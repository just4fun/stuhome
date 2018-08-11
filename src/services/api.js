import request from '~/utils/request';
import { getAppHashValue } from '~/utils/app';
import { API_ROOT, PLAT_TYPE } from '~/config';

const DEFAULT_SORTTYPE = 'all';
const DEFAULT_ORDER = 0;
const DEFAULT_AUTHORID = 0;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGESIZE = 20;

const ACTIONS = {
  REPLY: 'reply',
  NEW: 'new'
};

// Private Help Methods

function callApi(endpoint, options) {
  return request(`${API_ROOT}${endpoint}`, options);
}

function getPublishFetchOptions(body) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  };
}

function getUploadFetchOptions(body) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    body
  };
}

function getAid(images) {
  if (!images) { return null; }

  return images.map(image => image.data.body.attachment[0].id).join(',');
}

function getContent(content, images) {
  let contents = [];

  contents.push({
    type: 0,
    infor: content
  });

  if (images) {
    images.forEach(image => {
      contents.push({
        type: 1,
        infor: image.data.body.attachment[0].urlName
      });
    });
  }

  return JSON.stringify(contents);
}

function assemblePayload({
  boardId,
  topicId,
  replyId,
  typeId,
  title,
  images,
  content
}) {
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
        aid: getAid(images),
        content: getContent(content, images)
      }
    }
  };
}

// API Methods

export default {
  fetchLoginUser: ({
    userName,
    password
  }) => {
    // If we use `application/x-www-form-urlencoded` as `Content-Type`, the body should be
    // `key1=value1&key2=value2`, and the specific symbols in value1 and value2 will be treated
    // as same as we used them in the query string of GET request. That being said, we should
    // encode the values especially do comparing with database.
    let body = `username=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`;
    let fetchOptions = getPublishFetchOptions(body);
    return callApi(`user/login`, fetchOptions);
  },

  fetchTopicList: ({
    boardId,
    sortType = DEFAULT_SORTTYPE,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    if (sortType === 'hot') {
      // not sure what `moduleId=2` is, just capture the api from mobcent app.
      return callApi(`portal/newslist&moduleId=2&page=${page}&pageSize=${pageSize}`);
    }

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
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/search&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  },

  fetchTopic: ({
    topicId,
    authorId = DEFAULT_AUTHORID,
    order = DEFAULT_ORDER,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/postlist&topicId=${topicId}&authorId=${authorId}&order=${order}&page=${page}&pageSize=${pageSize}`);
  },

  publishVote: ({
    topicId,
    voteIds
  }) => {
    let body = `tid=${topicId}&options=${voteIds}`;
    let fetchOptions = getPublishFetchOptions(body);
    return callApi('forum/vote', fetchOptions);
  },

  publishTopic: (topic) => {
    // if there is `topicId`, it's `reply`, not `publish`
    let action = topic.topicId ? ACTIONS.REPLY : ACTIONS.NEW;
    let payload = assemblePayload(topic);
    let body = `act=${action}&json=${JSON.stringify(payload)}`;
    let fetchOptions = getPublishFetchOptions(body);

    return callApi(`forum/topicadmin&apphash=${getAppHashValue()}&platType=${PLAT_TYPE}`, fetchOptions);

    // If we want to test publish topic functionality without posting any
    // data, commment out callApi and use the code below.
    //
    // return new Promise(resolve => {
    //   setTimeout(() => { resolve({
    //     data: {
    //       rs: 1
    //     }
    //   }) }, 1000 * 3);
    // })
  },

  uploadImages: (images) => {
    if (!images || images.length === 0) { return Promise.resolve(null); }

    let promises = images.map((image, index) => {
      let formData = new FormData();
      formData.append('uploadFile[]', {
        type: 'image/jpg',
        name: `upload_${index}.jpg`,
        uri: image.path
      });
      let fetchOptions = getUploadFetchOptions(formData);
      return callApi(`forum/sendattachmentex&type=image&module=forum`, fetchOptions);
    });

    return Promise.all(promises);
  },

  uploadAvatar: (image) => {
    if (!image) { return Promise.resolve(null); }

    let formData = new FormData();
    formData.append('userAvatar', {
      type: 'image/jpg',
      name: `upload_avatar.jpg`,
      uri: image.path
    });
    let fetchOptions = getUploadFetchOptions(formData);
    return callApi(`user/uploadavatarex`, fetchOptions);
  },

  favorTopic: ({
    action,
    id,
    idType = 'tid',
  }) => {
    let body = `action=${action}&id=${id}&idType=${idType}`;
    let fetchOptions = getPublishFetchOptions(body);
    return callApi('user/userfavorite', fetchOptions);
  },

  fetchPmSessionList: ({
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    let json = `{'page': ${page}, 'pageSize': ${pageSize}}`;
    return callApi(`message/pmsessionlist&json=${json}`);
  },

  fetchPmList: ({
    userId,
    page = DEFAULT_PAGE
  }) => {
    let json = {
      body: {
        externInfo: {
          onlyFromUid: 0
        },
        pmInfos: [{
          startTime: 0,
          stopTime: + new Date(),
          // `cacheCount` is used for calculating `page`, refer source code for more information:
          // https://github.com/appbyme/mobcent-discuz/blob/master/app/controllers/message/PMListAction.php#L105-L116
          cacheCount: (page - 1) * DEFAULT_PAGESIZE,
          fromUid: userId,
          pmLimit: DEFAULT_PAGESIZE
        }]
      }
    };
    let body = `pmlist=${JSON.stringify(json)}`;
    let fetchOptions = getPublishFetchOptions(body);

    return callApi(`message/pmlist`, fetchOptions);
  },

  sendMessage: ({
    newMessage,
    toUserId
  }) => {
    let payload = {
      action: 'send',
      toUid: toUserId,
      msg: {
        type: 'text',
        content: newMessage.text
      }
    };
    let body = `json=${JSON.stringify(payload)}`;
    let fetchOptions = getPublishFetchOptions(body);

    return callApi(`message/pmadmin`, fetchOptions);
  },

  fetchAlert: () => {
    // Specify `sdkVersion` to get `systemInfo` instead of `friendInfo`.
    //
    // API source code:
    //
    // if($_GET['sdkVersion']>='2.4.2'){
    //   // 获得系统消息
    //   $res['body']['systemInfo'] = $this->_getSystemInfo($uid);
    // }else{
    //   // 获取好友通知
    //   $res['body']['friendInfo'] = $this->_getNotifyInfo($uid, 'friend');
    // }
    return callApi('message/heart&sdkVersion=2.4.2');
  },

  fetchUser: ({ userId }) => {
    return callApi(`user/userinfo&userId=${userId}`);
  },

  fetchFriendList: ({
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGESIZE
  }) => {
    return callApi(`forum/atuserlist&page=${page}&pageSize=${pageSize}`);
  }
};
