import _ from 'lodash';
import {
  RESET,
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  REQUEST_FAILED
} from '../../actions/message/alertAction';
import {
  MARK_AT_ME_AS_READ,
  MARK_REPLY_AS_READ
} from '../../actions/message/notifyListAction';
import { MARK_PM_AS_READ } from '../../actions/message/pmSessionListAction';
import { REMOVE_CACHE } from '../../actions/authorizeAction';

const defaultAlertState = {
  isFetching: false,
  response: {
    atMeInfo: { count: 0 },
    replyInfo: { count: 0 },
    pmInfos: []
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
      let {
        response: {
          replyInfo,
          pmInfos
        }
      } = state;
      return {
        ...state,
        response: {
          atMeInfo: { count: 0 },
          // Keep another information.
          replyInfo,
          pmInfos
        }
      };
    }
    case MARK_REPLY_AS_READ: {
      let {
        response: {
          atMeInfo,
          pmInfos
        }
      } = state;
      return {
        ...state,
        response: {
          atMeInfo,
          replyInfo: { count: 0 },
          pmInfos
        }
      };
    }
    case MARK_PM_AS_READ: {
      let {
        response: {
          atMeInfo,
          replyInfo
        }
      } = state;
      let { plid } = action.payload;
      return {
        ...state,
        response: {
          atMeInfo,
          replyInfo,
          pmInfos: state.response.pmInfos.filter(item => item.plid !== plid)
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
