import {
  INVALIDATE_USER_TOPICLIST,
  REQUEST_USER_TOPICLIST,
  RECEIVE_USER_TOPICLIST,
  RESET_USER_TOPICLIST,
  REMOVE_CACHE,
  FAILURE_USER_TOPICLIST
} from '../../constants/ActionTypes';

const defaultUserTopicListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  // dictionary for cache
  list: {},
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function userTopicList(state = defaultUserTopicListState, action) {
  switch (action.type) {
    case INVALIDATE_USER_TOPICLIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_USER_TOPICLIST:
      return {
        ...state,
        isRefreshing: !action.isEndReached,
        isEndReached: action.isEndReached,
        didInvalidate: false
      };
    case RECEIVE_USER_TOPICLIST:
      let {
        userId,
        individualType,
        userTopicList
      } = action;

      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        list: getNewCache(state, userTopicList.list, userId, individualType, userTopicList.page, userTopicList.rs),
        hasMore: !!userTopicList.has_next,
        page: userTopicList.page,
        errCode: userTopicList.errcode
      };
    case RESET_USER_TOPICLIST:
      return {
        ...state,
        errCode: ''
      };
    case FAILURE_USER_TOPICLIST:
      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false
      };
    case REMOVE_CACHE:
      return defaultUserTopicListState;
    default:
      return state;
  }
}

function getNewCache(oldState, userTopicList, userId, type, page, isSuccessful) {
  if (!isSuccessful) { return oldState.list; }

  let newUserTopicList = [];

  if (page !== 1) {
    newUserTopicList = oldState.list[userId][type].topicList.concat(userTopicList);
  } else {
    newUserTopicList = userTopicList;
  }

  return {
    ...oldState.list,
    [userId]: {
      ...oldState.list[userId],
      [type]: {
        topicList: newUserTopicList
      }
    }
  };
}
