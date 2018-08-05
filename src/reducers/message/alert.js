import _ from 'lodash';
import {
  RESET,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '~/actions/message/alertAction';
import {
  MARK_AT_ME_AS_READ,
  MARK_REPLY_AS_READ,
  MARK_SYSTEM_AS_READ
} from '~/actions/message/notifyListAction';
import { MARK_PM_AS_READ } from '~/actions/message/pmSessionListAction';
import { REMOVE_CACHE } from '~/actions/authorizeAction';

const defaultAlertState = {
  isFetching: false,
  response: {
    atMeInfo: { count: 0 },
    replyInfo: { count: 0 },
    pmInfos: [],
    systemInfo: { count: 0 }
  }
};

export default function alert(state = defaultAlertState, action) {
  switch (action.type) {
    case REQUEST_STARTED: {
      return {
        ...state,
        isFetching: true
      };
    }
    case REQUEST_COMPELTED:
      return {
        ...state,
        isFetching: false,
        response: action.payload.body
      };
    case REQUEST_FAILED: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case MARK_AT_ME_AS_READ: {
      return {
        ...state,
        response: {
          ...state.response,
          atMeInfo: { count: 0 }
        }
      };
    }
    case MARK_REPLY_AS_READ: {
      return {
        ...state,
        response: {
          ...state.response,
          replyInfo: { count: 0 },
        }
      };
    }
    case MARK_PM_AS_READ: {
      let { plid } = action.payload;
      return {
        ...state,
        response: {
          ...state.response,
          pmInfos: state.response.pmInfos.filter(item => item.plid !== plid)
        }
      };
    }
    case MARK_SYSTEM_AS_READ: {
      return {
        ...state,
        response: {
          ...state.response,
          systemInfo: { count: 0 },
        }
      };
    }
    case RESET:
    case REMOVE_CACHE:
      return defaultAlertState;
    default:
      return state;
  }
}
