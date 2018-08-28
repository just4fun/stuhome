import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

// *********************************
// Actions
// *********************************

export const TOPIC_FETCH = 'TOPIC_FETCH';
export const TOPIC_RESET = 'TOPIC_RESET';

const TOPIC_FETCH_SUCCESS = 'TOPIC_FETCH_SUCCESS';
const TOPIC_FETCH_FAILURE = 'TOPIC_FETCH_FAILURE';

// *********************************
// Action Creators
// *********************************

export const fetchTopic = createAction(TOPIC_FETCH);
export const resetTopic = createAction(TOPIC_RESET);

export const fetchTopicSuccess = createAction(TOPIC_FETCH_SUCCESS, null, (...args) => args[1]);
export const fetchTopicFailure = createAction(TOPIC_FETCH_FAILURE);

// *********************************
// Reducer
// *********************************

// We don't use `cacheManager` to check `shouldFetchTopicItem` in sagas
// since topic comments are back with topic details together, and we don't
// want to cache comments (that said we will always get latest comments with
// latest topic information in `componentDidMount` every time).
//
// In this way, we should not also reset/clear the topic item in `componentWillUnmount`.
// Say we navigate from topic A --> topic B --> topic A, then touch back twice to topic
// A. We will get blank page since the content of topic A has been `reset` in the third
// page's `componentWillUnmount`.
//
// The only disadvantage of not resetting topic item is that, if we navigate from
// topic A --> topic A (try it out in http://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1705815),
// we will see the content of first topic A will replace with loading spinner since we trigger
// request action for topic A again. As tradeoff, I think it's not big deal.

// There is no race condition if we isolate every topic item via topicId in redux store.
// https://github.com/just4fun/stuhome/issues/25

const defaultState = {};
const defaultTopicState = {
  isFetching: false,
  isEndReached: false,
  topic: null,
  // Comment list.
  list: [],
  hasMore: false,
  page: 0,
  errCode: ''
};

export default handleActions({
  [TOPIC_FETCH]: (state, action) => {
    let { topicId, isEndReached } = action.payload;
    return {
      ...state,
      [topicId]: {
        ..._.get(state, topicId, defaultTopicState),
        isFetching: !isEndReached,
        isEndReached: isEndReached
      }
    };
  },
  [TOPIC_FETCH_SUCCESS]: (state, action) => {
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
  },
  [TOPIC_FETCH_FAILURE]: (state, action) => {
    let { topicId } = action.payload;
    return {
      ...state,
      [topicId]: {
        ..._.get(state, topicId, defaultTopicState),
        isFetching: false,
        isEndReached: false
      }
    };
  },
  // We didn't cahce topic item like topic list, because comment list
  // will be returned with topic info together, that means we will also
  // cache topic comments as well.
  //
  // This will be triggerd in `componentWillUnmount()`.
  [TOPIC_RESET]: (state, action) => {
    let { topicId } = action.payload;
    return _.pickBy(state, (value, key) => +key !== +topicId);
  }
}, defaultTopicState);
