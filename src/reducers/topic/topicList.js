import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/topicListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

const defaultTopicListState = {
  // indicate fetching via pull to refresh
  isRefreshing: false,
  // indicate fetching via end reached
  isEndReached: false,
  didInvalidate: false,
  boardId: null,
  // dictionary for cache
  list: {},
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function topicList(state = defaultTopicListState, action) {
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
        payload: topicList,
        meta: {
          boardId
        }
      } = action;
      let typeList = getMappedTypeList(topicList.classificationType_list);

      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        boardId,
        list: getNewCache(state, typeList, topicList.list, boardId, topicList.page, topicList.rs),
        hasMore: !!topicList.has_next,
        page: topicList.page,
        errCode: topicList.errcode
      };
    // in case there is forum or sub forum we have no access
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
      return defaultTopicListState;
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
function getNewCache(oldState, typeList, topicList, boardId, page, isSuccessful) {
  // if we have no access to a forum or sub forum, we
  // should return original forum groups.
  if (!isSuccessful) { return oldState.list; }

  let newTopicList = [];

  if (page !== 1) {
    newTopicList = oldState.list[boardId].topicList.concat(topicList);
  } else {
    newTopicList = topicList;
  }

  return {
    ...oldState.list,
    [boardId]: {
      typeList,
      topicList: newTopicList
    }
  };
}
