import _ from 'lodash';
import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../../actions/user/topicListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

const defaultState = {};
const defaultUserTopicListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function userTopicList(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE: {
      let { userId, type } = action.payload;

      return {
        ...state,
        [userId]: {
          ..._.get(state, userId, {}),
          [type]: {
            ..._.get(state, [userId, type], defaultUserTopicListState),
            didInvalidate: true
          }
        }
      };
    }
    case REQUEST_STARTED: {
      let { userId, type, isEndReached } = action.payload;

      return {
        ...state,
        [userId]: {
          ..._.get(state, userId, {}),
          [type]: {
            ..._.get(state, [userId, type], defaultUserTopicListState),
            isRefreshing: !isEndReached,
            isEndReached: isEndReached,
            didInvalidate: false
          }
        }
      };
    }
    case REQUEST_COMPELTED:
      let {
        payload: userTopicList,
        meta: {
          userId,
          type
        }
      } = action;

      return {
        ...state,
        [userId]: {
          ..._.get(state, userId, {}),
          [type]: {
            ..._.get(state, [userId, type], defaultUserTopicListState),
            isRefreshing: false,
            isEndReached: false,
            didInvalidate: false,
            list: getNewCache(state, userTopicList.list, userId, type, userTopicList.page, userTopicList.rs),
            hasMore: !!userTopicList.has_next,
            page: userTopicList.page,
            errCode: userTopicList.errcode
          }
        }
      };
    case REQUEST_FAILED: {
      let { userId, type } = action.meta;

      return {
        ...state,
        [userId]: {
          ..._.get(state, userId, {}),
          [type]: {
            ..._.get(state, [userId, type], defaultUserTopicListState),
            isRefreshing: false,
            isEndReached: false,
            didInvalidate: false
          }
        }
      };
    }
    case REMOVE_CACHE:
      return defaultState;
    default:
      return state;
  }
}

function getNewCache(oldState, userTopicList, userId, type, page, isSuccessful) {
  if (!isSuccessful) { return oldState.list; }

  let newUserTopicList = [];

  if (page !== 1) {
    newUserTopicList = oldState[userId][type].list.concat(userTopicList);
  } else {
    newUserTopicList = userTopicList;
  }

  return newUserTopicList;
}
