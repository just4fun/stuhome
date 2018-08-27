import { combineEpics } from 'redux-observable';
import topicList from '~/modules/topic/topicList/topicList.epics';
import forumList from '~/modules/forum/forumList/forumList.epics';
import searchList from '~/modules/topic/searchList/searchList.epics';

export default combineEpics(
  topicList,
  forumList,
  searchList
);
