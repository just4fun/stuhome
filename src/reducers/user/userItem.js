import _ from 'lodash';
import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '~/actions/user/userAction';

const defaultState = {};
const defaultUserState = {
  isFetching: false,
  user: {},
  errCode: ''
};

export default function userItem(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_STARTED: {
      let { userId } = action.payload;

      return {
        ...state,
        [userId]: {
          isFetching: true,
          ..._.get(state, userId, defaultUserState)
        }
      };
    }
    case REQUEST_COMPELTED: {
      let {
        payload,
        meta: {
          userId
        }
      } = action;

      return {
        ...state,
        [userId]: {
          ..._.get(state, userId, defaultUserState),
          isFetching: false,
          user: payload,
          errCode: payload.errcode
        }
      };
    }
    // We didn't cahce user item like topic list, because user information
    // will be updated frequently like published/replied post count.
    //
    // This will be triggerd in `componentWillUnmount()`.
    case RESET: {
      let { userId } = action.payload;

      return _.pickBy(state, (value, key) => +key !== userId);
    }
    case REQUEST_FAILED: {
      let { userId } = action.payload;

      return {
        ...state,
        [userId]: {
          isFetching: false,
          ..._.get(state, userId, defaultUserState)
        }
      };
    }
    default:
      return state;
  }
}
