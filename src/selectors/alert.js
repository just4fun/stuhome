import _ from 'lodash';

export const getAtMeCount = alertState => _.get(alertState, ['response', 'atMeInfo', 'count'], 0);
export const getReplyCount = alertState => _.get(alertState, ['response', 'replyInfo', 'count'], 0);
export const getPmCount = alertState => _.get(alertState, ['response', 'pmInfos', 'length'], 0);

export const getAlertCount = alertState => {
  return getAtMeCount(alertState) + getReplyCount(alertState) + getPmCount(alertState);
};
