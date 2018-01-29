import { combineReducers } from 'redux';
import user from './user';
import forumList from './forumList';
import topicList from './topic/topicList';
import topicItem from './topic/topicItem';
import search from './topic/search';
import vote from './topic/vote';
import topicFavor from './topic/favor';
import notifyList from './message/notifyList';
import pmSessionList from './message/pmSessionList';
import userTopicList from './user/topicList';
import pmList from './message/pmList';
import send from './message/send';
import alert from './message/alert';
import settings from './settings';

export default combineReducers({
  forumList,
  topicList,
  notifyList,
  pmSessionList,
  pmList,
  send,
  alert,

  user,
  topicItem,
  search,
  vote,
  topicFavor,

  userTopicList,

  settings
});
