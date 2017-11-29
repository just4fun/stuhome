export const getAtMeCount = alertState => alertState.response.atMeInfo.count;
export const getReplyCount = alertState => alertState.response.replyInfo.count;
export const getPmCount = alertState => alertState.response.pmInfos.length;

export const getAlertCount = alertState => {
  let { atMeInfo, pmInfos, replyInfo } = alertState.response;
  return atMeInfo.count + replyInfo.count + pmInfos.length;
};
