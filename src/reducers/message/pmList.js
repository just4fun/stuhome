import _ from 'lodash';
import {
  RESET,
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
  user: ''
};

export default function pmList(state = defaultPmListState, action) {
  switch (action.type) {
    case REQUEST_STARTED: {
      let { isRefreshing } = action.payload;

      return {
        ...state,
        isRefreshing
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

      return {
        ...state,
        isRefreshing: false,
        list: pmList[0].msgList.reverse(),
        hasPrev: !!pmList[0].hasPrev,
        page: meta.page,
        errCode: payload.errcode,
        user: {
          id: pmList[0].fromUid,
          name: pmList[0].name,
          avatar: pmList[0].avatar
        }
      };
    case REQUEST_FAILED: {
      return {
        ...state,
        isRefreshing: false,
      };
    }
    case RESET:
      return defaultPmListState;
    default:
      return state;
  }
}
