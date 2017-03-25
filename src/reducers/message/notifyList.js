import _ from 'lodash';
import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../../actions/message/notifyListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

const defaultState = {};
const defaultNotifyListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  notifyType: null,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function notifyList(state = defaultState, action) {
  switch (action.type) {
    case INVALIDATE: {
      let { notifyType } = action.payload;

      return {
        ...state,
        [notifyType]: {
          ..._.get(state, notifyType, defaultNotifyListState),
          didInvalidate: true
        }
      };
    }
    case REQUEST_STARTED: {
      let { notifyType, isEndReached } = action.payload;

      return {
        ...state,
        [notifyType]: {
          ..._.get(state, notifyType, defaultNotifyListState),
          isRefreshing: !isEndReached,
          isEndReached: isEndReached,
          didInvalidate: false
        }
      };
    }
    case REQUEST_COMPELTED:
      let {
        payload: notifyList,
        meta: {
          notifyType
        }
      } = action;

      return {
        ...state,
        [notifyType]: {
          ..._.get(state, notifyType, defaultNotifyListState),
          isRefreshing: false,
          isEndReached: false,
          didInvalidate: false,
          notifyType,
          list: getNewCache(state, notifyList.list, notifyType, notifyList.page),
          hasMore: !!notifyList.has_next,
          page: notifyList.page,
          errCode: notifyList.errcode
        }
      };
    case REQUEST_FAILED: {
      let { notifyType } = action.meta;

      return {
        ...state,
        [notifyType]: {
          ..._.get(state, notifyType, defaultNotifyListState),
          isRefreshing: false,
          isEndReached: false,
          didInvalidate: false
        }
      };
    }
    case REMOVE_CACHE:
      return defaultState;
    default:
      return state;
  }
}

function getNewCache(oldState, notifyList, notifyType, page) {
  let newNotifyList = [];

  if (page !== 1) {
    newNotifyList = oldState[notifyType].list.concat(notifyList);
  } else {
    newNotifyList = notifyList;
  }

  return newNotifyList;
}
