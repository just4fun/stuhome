import _ from 'lodash';
import {
  INVALIDATE,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../../actions/message/pmSessionListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

const defaultPmSessionListState = {
  isRefreshing: false,
  isEndReached: false,
  didInvalidate: false,
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function pmSessionList(state = defaultPmSessionListState, action) {
  switch (action.type) {
    case INVALIDATE: {
      return {
        ...state,
        didInvalidate: true
      };
    }
    case REQUEST_STARTED: {
      let { isEndReached } = action.payload;

      return {
        ...state,
        isRefreshing: !isEndReached,
        isEndReached: isEndReached,
        didInvalidate: false
      };
    }
    case REQUEST_COMPELTED:
      let {
        meta,
        payload,
        payload: {
          body: pmSessionList
        }
      } = action;

      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        list: getNewCache(state, pmSessionList.list, meta.page),
        hasMore: !!pmSessionList.hasNext,
        page: meta.page,
        errCode: payload.errcode
      };
    case REQUEST_FAILED: {
      return {
        ...state,
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false
      };
    }
    case REMOVE_CACHE:
      return defaultPmSessionListState;
    default:
      return state;
  }
}

function getNewCache(oldState, pmSessionList, page) {
  let newPmSessionList = [];

  if (page !== 1) {
    newPmSessionList = oldState.list.concat(pmSessionList);
  } else {
    newPmSessionList = pmSessionList;
  }

  return newPmSessionList;
}
