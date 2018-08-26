import { createAction, handleActions } from 'redux-actions';
import { LOGOUT } from '~/modules/user/session.ducks';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const TOPICLIST_FETCH = 'TOPICLIST_FETCH';
export const TOPICLIST_INVALIDATE = 'TOPICLIST_INVALIDATE';
export const TOPICLIST_RESET = 'TOPICLIST_RESET';

const TOPICLIST_FETCH_SUCCESS = 'TOPICLIST_FETCH_SUCCESS';
const TOPICLIST_FETCH_FAILURE = 'TOPICLIST_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchTopicList = createAction(TOPICLIST_FETCH);
export const invalidateTopicList = createAction(TOPICLIST_INVALIDATE);
export const resetTopicList = createAction(TOPICLIST_RESET);

export const fetchTopicListSuccess = createAction(TOPICLIST_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchTopicListFailure = createAction(TOPICLIST_FETCH_FAILURE, null, (...args) => args[1]);

// *********************************
// Reducer
// *********************************

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

export default handleActions({
  [TOPICLIST_INVALIDATE]: (state, action) => {
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
  },
  [TOPICLIST_FETCH]: (state, action) => {
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
  },
  [TOPICLIST_FETCH_SUCCESS]: (state, action) => {
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
  },
  [TOPICLIST_FETCH_FAILURE]: (state, action) => {
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
  },
  // In case there is forum or sub forum we have no access.
  [TOPICLIST_RESET]: (state, action) => {
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
  },
  [LOGOUT]: () => defaultState
}, defaultState);

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
