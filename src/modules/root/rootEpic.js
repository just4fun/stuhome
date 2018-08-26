import { combineEpics } from 'redux-observable';
import topicList from '~/modules/topic/topicList/topicList.epics';
import searchList from '~/modules/topic/searchList/searchList.epics';

export default combineEpics(
  topicList,
  searchList
);
