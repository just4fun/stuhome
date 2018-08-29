import { combineEpics } from 'redux-observable';

import session from '~/modules/user/session/session.epics';
import topicList from '~/modules/topic/topicList/topicList.epics';
import forumList from '~/modules/forum/forumList/forumList.epics';
import searchList from '~/modules/topic/searchList/searchList.epics';
import pmSessionList from '~/modules/message/pmSessionList/pmSessionList.epics';
import pmList from '~/modules/message/pmList/pmList.epics';
import userTopicList from '~/modules/user/userTopicList/userTopicList.epics';
import friendList from '~/modules/user/friendList/friendList.epics';
import topicItem from '~/modules/topic/topic/topic.epics';
import userItem from '~/modules/user/user/user.epics';
import settings from '~/modules/settings/settings.epics';

export default combineEpics(
  session,

  topicList,
  forumList,
  searchList,
  pmSessionList,
  pmList,
  userTopicList,
  friendList,

  topicItem,
  userItem,

  settings
);
