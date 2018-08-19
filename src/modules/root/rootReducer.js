import { combineReducers } from 'redux';
import session from '~/modules/user/session.ducks';
import topicList from '~/modules/topic/topicList/topicList.ducks';
import forumList from '~/modules/forum/forumList.ducks';
import searchList from '~/modules/topic/searchList.ducks';
import notifyList from '~/modules/message/notifyList.ducks';
import pmSessionList from '~/modules/message/pmSessionList.ducks';
import pmList from '~/modules/message/pmList.ducks';
import userTopicList from '~/modules/user/userTopicList.ducks';
import friendList from '~/modules/user/friendList.ducks';
import topicItem from '~/modules/topic/topic.ducks';
import userItem from '~/modules/user/user.ducks';
import alert from '~/modules/message/alert.ducks';
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
