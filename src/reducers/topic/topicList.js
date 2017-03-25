import _ from 'lodash';
import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/topicListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

const defaultState = {};
const defaultTopicListState = {
  // indicate fetching via pull to refresh
  isRefreshing: false,
  // indicate fetching via end reached
  isEndReached: false,
  didInvalidate: false,
  boardId: null,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function topicList(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE: {
      let { boardId, sortType } = action.payload;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, {}),
          [sortType]: {
            ..._.get(state, [boardId, sortType], defaultTopicListState),
            didInvalidate: true
          }
        }
      };
    }
    case REQUEST_STARTED: {
      let { boardId, sortType, isEndReached } = action.payload;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, {}),
          [sortType]: {
            ..._.get(state, [boardId, sortType], defaultTopicListState),
            isRefreshing: !isEndReached,
            isEndReached: isEndReached,
            didInvalidate: false
          }
        }
      };
    }
    case REQUEST_COMPELTED:
      let {
        payload: topicList,
        meta: {
          boardId,
          sortType
        }
      } = action;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, {}),
          // all topic list of different sort type have same type list
          typeList: getMappedTypeList(topicList.classificationType_list),
          [sortType]: {
            ..._.get(state, [boardId, sortType], defaultTopicListState),
            isRefreshing: false,
            isEndReached: false,
            didInvalidate: false,
            boardId,
            list: getNewCache(state, topicList.list, boardId, sortType, topicList.page, topicList.rs),
            hasMore: !!topicList.has_next,
            page: topicList.page,
            errCode: topicList.errcode
          }
        }
      };
    // in case there is forum or sub forum we have no access
    case RESET: {
      let { boardId, sortType } = action.payload;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, {}),
          [sortType]: {
            ..._.get(state, [boardId, sortType], defaultTopicListState),
            errCode: ''
          }
        }
      };
    }
    case REQUEST_FAILED: {
      let { boardId, sortType } = action.meta;

      return {
        ...state,
        [boardId]: {
          ..._.get(state, boardId, {}),
          [sortType]: {
            ..._.get(state, [boardId, sortType], defaultTopicListState),
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

// map the fields of `type` to more clear names
function getMappedTypeList(typeList) {
  if (!typeList) { return []; }

  return typeList.map((item, index) => {
    return {
      typeId: item.classificationType_id,
      typeName: item.classificationType_name
    };
  });
}

// cache topic list and return
function getNewCache(oldState, topicList, boardId, sortType, page, isSuccessful) {
  // if we have no access to a forum or sub forum, we
  // should return original forum groups.
  if (!isSuccessful) { return oldState.list; }

  let newTopicList = [];

  if (page !== 1) {
    newTopicList = oldState[boardId][sortType].list.concat(topicList);
  } else {
    newTopicList = topicList;
  }

  return newTopicList;
}
