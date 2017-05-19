import _ from 'lodash';

export default {
  shouldFetchList(state, stateKey, ...cacheKeys) {
    let stateForList = state[stateKey];
    let realListObject = null;

    if (cacheKeys.length > 0) {
      realListObject = _.get(stateForList, [...cacheKeys]);
    } else {
      realListObject = stateForList;
    }

    if (!realListObject ||
        !realListObject.list ||
        !realListObject.list.length) { return true; }

    if (realListObject.isRefreshing ||
        realListObject.isEndReached) { return false; }

    return realListObject.didInvalidate;
  }
};
