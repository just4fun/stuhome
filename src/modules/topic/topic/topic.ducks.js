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

// *********************************
// Why we need to use key-value for each topic in redux store?
// *********************************
//
// First of all, if we use key-value, that means we want to cache each topic.
// However, the comments of a topic will back with topic information together,
// that means we may won't get latest comments in next time.
//
// In this way, sounds like key-value is not needed, just use object to store
// one specific topic is enough.
//
// In this app, we have one scenario, we can navigate from topic A to topic B
// with inside link. In this case, if we touch back button to topic A, we will
// still see the content of topic B. That's the reason.

// *********************************
// If we don't cache each topic content, why we don't reset/clear the topic
// content in `componentWillUnmount`?
// *********************************
//
// 1. We have no need to reset/clear to content since we don't use `cacheManager`
// to check whether we can fetch the topic, that said we will always get latest
// topic content in `componentDidMount` to overwrite the old one.
//
// 2. If we nagivate from topic A --> topic B --> topic A, or topic A --> topic A
// (try it out in https://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1705815),
// when we touch back button to first topic A page, we will see nothing,
// since the content of topic A has been `reset/clear` in the last topic A
// page's `componentWillUnmount`.

// *********************************
// Any disadvantages if we don't reset/clear the topic content?
// *********************************
//
// The only disadvantage of not resetting topic item is that, if we navigate from
// topic A --> topic A, we will see the content of first topic A will be replaced
// with loading spinner before the page transition since we trigger request action
// for topic A again. As tradeoff, I think it's not big deal.

// *********************************
// Why there is still `TOPIC_RESET` action?
// *********************************
//
// 1. Before we display login modal instead when user clicks topic in home page
// without credentials, this action was used to reset the topic which we have no
// access.
//
// 2. Even we login, there are still topics we have no access, such as the topics
// in some specific forums like `版主交流`.

// *********************************
// Is there race condition?
// *********************************
//
// There is also no race condition if we use key-value for each topic in redux store.
// https://github.com/just4fun/stuhome/issues/25
//
// So we also have no need to use `takeUntil` to cancel fetch request when we leave the page
// before response back. But we need to do it in search page because we won't send request
// when we access search page and it may display previous search result without cancelling.

const defaultState = {};
const defaultTopicState = {
  isFetching: false,
  isEndReached: false,
  // Topic information.
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
  [TOPIC_RESET]: (state, action) => {
    let { topicId } = action.payload;
    return _.pickBy(state, (value, key) => +key !== +topicId);
  }
}, defaultState);
