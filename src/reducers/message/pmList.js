import _ from 'lodash';
import {
  RESET,
  RESET_RESPONSE_STATUS,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../../actions/message/pmListAction';

const defaultPmListState = {
  isRefreshing: false,
  list: [],
  hasPrev: false,
  page: 0,
  errCode: '',
  user: '',
  response: ''
};

export default function pmList(state = defaultPmListState, action) {
  switch (action.type) {
    case REQUEST_STARTED: {
      return {
        ...state,
        isRefreshing: true
      };
    }
    case REQUEST_COMPELTED:
      let {
        meta,
        payload,
        payload: {
          body: {
            pmList
          }
        }
      } = action;

      let msgList = null;

      if (meta.page !== 1) {
        msgList = state.list.concat(pmList[0].msgList.reverse());
      } else {
        msgList = pmList[0].msgList.reverse();
      }

      return {
        ...state,
        isRefreshing: false,
        list: msgList,
        hasPrev: !!pmList[0].hasPrev,
        page: meta.page,
        errCode: payload.errcode,
        user: {
          id: pmList[0].fromUid,
          name: pmList[0].name,
          avatar: pmList[0].avatar
        },
        response: payload
      };
    case REQUEST_FAILED: {
      return {
        ...state,
        isRefreshing: false,
      };
    }
    case RESET:
      return defaultPmListState;
    case RESET_RESPONSE_STATUS:
      return {
        ...state,
        response: ''
      };
    default:
      return state;
  }
}
