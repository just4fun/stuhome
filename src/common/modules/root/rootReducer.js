import { combineReducers } from 'redux';
import session from '~/common/modules/user/session.ducks';
import topicList from '~/common/modules/topic/topicList.ducks';
import forumList from '~/common/modules/forum/forumList.ducks';
import searchList from '~/common/modules/topic/searchList.ducks';
import notifyList from '~/common/modules/message/notifyList.ducks';
import pmSessionList from '~/common/modules/message/pmSessionList.ducks';
import pmList from '~/common/modules/message/pmList.ducks';
import userTopicList from '~/common/modules/user/userTopicList.ducks';
import friendList from '~/common/modules/user/friendList.ducks';
import topicItem from '~/common/modules/topic/topic.ducks';
import userItem from '~/common/modules/user/user.ducks';
import alert from '~/common/modules/message/alert.ducks';
import settings from '~/common/modules/settings/settings.ducks';

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
