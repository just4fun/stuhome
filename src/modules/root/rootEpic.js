import { combineEpics } from 'redux-observable';
import topicList from '~/modules/topic/topicList/topicList.epics';

export default combineEpics(
  topicList
);
