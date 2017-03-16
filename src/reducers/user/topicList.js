import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/user/topicListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

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
    case INVALIDATE:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_STARTED:
      return {
        ...state,
        isRefreshing: !action.payload.isEndReached,
        isEndReached: action.payload.isEndReached,
        didInvalidate: false
      };
    case REQUEST_COMPELTED:
      let {
        payload: userTopicList,
        meta: {
          userId,
          type: individualType
        }
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
    case RESET:
      return {
        ...state,
        errCode: ''
      };
    case REQUEST_FAILED:
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
