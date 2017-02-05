import {
  INVALIDATE,
  REQUEST_AT_STARTED,
  REQUEST_REPLY_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED,
  REMOVE_CACHE
} from '../../actions/message/notifyListAction';

const defaultNotifyListState = {
  isFetchingAtList: false,
  isFetchingReplyList: false,
  isEndReached: false,
  didInvalidate: false,
  notifyType: null,
  list: {},
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function notifyList(state = defaultNotifyListState, action) {
  switch (action.type) {
    case INVALIDATE:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_AT_STARTED:
      return {
        ...state,
        isFetchingAtList: !action.payload.isEndReached,
        isFetchingReplyList: false,
        isEndReached: action.payload.isEndReached,
        didInvalidate: false
      };
    case REQUEST_REPLY_STARTED:
      return {
        ...state,
        isFetchingAtList: false,
        isFetchingReplyList: !action.payload.isEndReached,
        isEndReached: action.payload.isEndReached,
        didInvalidate: false
      };
    case REQUEST_COMPELTED:
      let {
        payload: notifyList,
        meta: {
          notifyType
        }
      } = action;

      return {
        ...state,
        isFetchingAtList: false,
        isFetchingReplyList: false,
        isEndReached: false,
        didInvalidate: false,
        notifyType,
        list: getNewCache(state, notifyList.list, notifyType, notifyList.page),
        hasMore: !!notifyList.has_next,
        page: notifyList.page,
        errCode: notifyList.errcode
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetchingAtList: false,
        isFetchingReplyList: false,
        isEndReached: false,
        didInvalidate: false
      };
    case REMOVE_CACHE:
      return defaultNotifyListState;
    default:
      return state;
  }
}

function getNewCache(oldState, notifyList, notifyType, page) {
  let newNotifyList = [];

  if (page !== 1) {
    newNotifyList = oldState.list[notifyType].notifyList.concat(notifyList);
  } else {
    newNotifyList = notifyList;
  }

  return {
    ...oldState.list,
    [notifyType]: {
      notifyList: newNotifyList
    }
  };
}
