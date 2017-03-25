import _ from 'lodash';

export default {
  shouldFetchList(state, stateKey, ...cacheKeys) {
    let stateForList = state[stateKey];
    let realListObject = _.get(stateForList, [...cacheKeys]);

    if (!realListObject ||
        !realListObject.list ||
        !realListObject.list.length) { return true; }

    if (realListObject.isRefreshing ||
        realListObject.isEndReached) { return false; }

    return realListObject.didInvalidate;
  }
};
