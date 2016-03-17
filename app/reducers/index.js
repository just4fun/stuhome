import { combineReducers } from 'redux';
import route from './route';
import user from './user';
import forumList from './forumList';
import topicList from './topic/topicList';
import topicItem from './topic/topicItem';
import comment from './topic/comment';

module.exports = combineReducers({
  route,

  forumList,
  topicList,

  user,
  topicItem,
  comment
});
