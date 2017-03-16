import _ from 'lodash';

export default {
  shouldFetchList(state, stateKey, ...cacheKeys) {
    let stateForList = state[stateKey];
    let realListObject = _.get(stateForList, ['list', ...cacheKeys]);

    if (!realListObject) { return true; }

    // the pages using <TopicList /> component will
    // use `topicList` as resource key.
    let resourceKey = stateKey;
    if (stateKey === 'userTopicList') {
      resourceKey = 'topicList';
    }

    if (!realListObject[resourceKey].length) { return true; }

    if (stateForList.isRefreshing ||
        stateForList.isEndReached ||
        stateForList.isFetching ||
        stateForList.isSubFetching ||
        stateForList.isFetchingAtList ||
        stateForList.isFetchingReplyList) { return false; }

    return stateForList.didInvalidate;
  }
};
