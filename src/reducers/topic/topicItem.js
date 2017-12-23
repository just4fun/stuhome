import _ from 'lodash';
import {
  REQUEST_STARTED,
  REQUEST_COMPELTED,
  RESET,
  REQUEST_FAILED
} from '../../actions/topic/topicAction';

// The reason to cache topic item like we cache topic list is that
// now we could navigate from A topic to B topic, which shared
// same state in store, if we back from B topic, the A topic component
// will still display the content for B topic, so we need to distinguish
// them via topicId.
//
// To avoid cache comments for one topic, when we click back button which
// will trigger `componentWillUnmount()`, it will remove specific topic
// from topic item cache list.
const defaultState = {};
const defaultTopicState = {
  isFetching: false,
  // indicate fetching via end reached
  isEndReached: false,
  topic: null,
  // comment list
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default function topicItem(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_STARTED: {
      let { topicId, isEndReached } = action.payload;

      return {
        ...state,
        [topicId]: {
          ..._.get(state, topicId, defaultTopicState),
          isFetching: !isEndReached,
          isEndReached: isEndReached
        }
      };
    }
    case REQUEST_COMPELTED: {
      let {
        payload: {
          page,
          list,
          topic,
          has_next,
          errcode,
        },
        meta: {
          topicId
        }
      } = action;

      if (!errcode && page !== 1) {
        list = _.get(state, [topicId, 'list'], []).concat(list);
        // the API won't return `topic` field when `page` is not equal `1`
        topic = _.get(state, [topicId, 'topic'], {});
      }

      return {
        ...state,
        [topicId]: {
          ..._.get(state, topicId, defaultTopicState),
          isFetching: false,
          isEndReached: false,
          topic: topic,
          list: list,
          hasMore: !!has_next,
          page: page,
          errCode: errcode
        }
      };
    }
    // We didn't cahce topic item like topic list, because comment list
    // will be returned with topic info together, that means we will also
    // cache topic comments as well.
    //
    // This will be triggerd in `componentWillUnmount()`.
    case RESET: {
      let { topicId } = action.payload;

      return _.pickBy(state, (value, key) => +key !== topicId);
    }
    case REQUEST_FAILED: {
      let { topicId } = action.payload;

      return {
        ...state,
        [topicId]: {
          ..._.get(state, topicId, defaultTopicState),
          isFetching: false,
          isEndReached: false
        }
      };
    }
    default:
      return state;
  }
}
