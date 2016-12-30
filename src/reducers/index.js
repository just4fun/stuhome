import { combineReducers } from 'redux';
import user from './user';
import forumList from './forumList';
import topicList from './topic/topicList';
import topicItem from './topic/topicItem';
import publish from './topic/publish';
import reply from './topic/reply';
import search from './topic/search';
import vote from './topic/vote';
import notifyList from './message/notifyList';
import userTopicList from './user/topicList';

export default combineReducers({
  forumList,
  topicList,
  notifyList,

  user,
  topicItem,
  publish,
  reply,
  search,
  vote,

  userTopicList
});
