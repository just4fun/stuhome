import {
  INVALIDATE_NOTIFYLIST,
  REQUEST_NOTIFYLIST_AT,
  REQUEST_NOTIFYLIST_REPLY,
  RECEIVE_NOTIFYLIST
} from '../../constants/ActionTypes';

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
    case INVALIDATE_NOTIFYLIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_NOTIFYLIST_AT:
      return {
        ...state,
        isFetchingAtList: !action.isEndReached,
        isFetchingReplyList: false,
        isEndReached: action.isEndReached,
        didInvalidate: false
      };
    case REQUEST_NOTIFYLIST_REPLY:
      return {
        ...state,
        isFetchingAtList: false,
        isFetchingReplyList: !action.isEndReached,
        isEndReached: action.isEndReached,
        didInvalidate: false
      };
    case RECEIVE_NOTIFYLIST:
      let {
        notifyType,
        notifyList
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
    default:
      return state;
  }
}

function getNewCache(oldState, notifyList, notifyType, page) {
  let newNotifyList = [];
  let newState = { ...oldState };

  if (page !== 1) {
    newNotifyList = oldState.list[notifyType].notifyList.concat(notifyList);
  } else {
    newNotifyList = notifyList.slice(0);
  }

  newState.list[notifyType] = {
    notifyList: newNotifyList
  };
  return newState.list;
}
