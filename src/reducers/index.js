import { combineReducers } from 'redux';
import user from './user';
import forumList from './forumList';
import topicList from './topic/topicList';
import topicItem from './topic/topicItem';
import publish from './topic/publish';
import reply from './topic/reply';
import search from './topic/search';
import vote from './topic/vote';
import topicFavor from './topic/favor';
import notifyList from './message/notifyList';
import pmSessionList from './message/pmSessionList';
import userTopicList from './user/topicList';
import pmList from './message/pmList';
import send from './message/send';

export default combineReducers({
  forumList,
  topicList,
  notifyList,
  pmSessionList,
  pmList,
  send,

  user,
  topicItem,
  publish,
  reply,
  search,
  vote,
  topicFavor,

  userTopicList
});
