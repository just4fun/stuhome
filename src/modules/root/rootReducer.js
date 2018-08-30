import { combineReducers } from 'redux';

import session from '~/modules/user/session/session.ducks';
import topicList from '~/modules/topic/topicList/topicList.ducks';
import forumList from '~/modules/forum/forumList/forumList.ducks';
import searchList from '~/modules/topic/searchList/searchList.ducks';
import notifyList from '~/modules/message/notifyList/notifyList.ducks';
import pmSessionList from '~/modules/message/pmSessionList/pmSessionList.ducks';
import pmList from '~/modules/message/pmList/pmList.ducks';
import userTopicList from '~/modules/user/userTopicList/userTopicList.ducks';
import friendList from '~/modules/user/friendList/friendList.ducks';
import topicItem from '~/modules/topic/topic/topic.ducks';
import userItem from '~/modules/user/user/user.ducks';
import alert from '~/modules/message/alert/alert.ducks';
import settings from '~/modules/settings/settings.ducks';

export default combineReducers({
  session,

  topicList,
  forumList,
  searchList,
  notifyList,
  pmSessionList,
  pmList,
  userTopicList,
  friendList,

  topicItem,
  userItem,

  alert,
  settings
});
