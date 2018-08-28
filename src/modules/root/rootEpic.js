import { combineEpics } from 'redux-observable';
import topicList from '~/modules/topic/topicList/topicList.epics';
import forumList from '~/modules/forum/forumList/forumList.epics';
import searchList from '~/modules/topic/searchList/searchList.epics';
import friendList from '~/modules/user/friendList/friendList.epics';
import topicItem from '~/modules/topic/topic/topic.epics';
import settings from '~/modules/settings/settings.epics';

export default combineEpics(
  topicList,
  forumList,
  searchList,
  friendList,

  topicItem,

  settings
);
