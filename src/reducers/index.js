import { combineReducers } from 'redux';
import user from './user';
import forumList from './forumList';
import topicList from './topic/topicList';
import topicItem from './topic/topicItem';
import comment from './topic/comment';
import search from './topic/search';
import vote from './topic/vote';
import notifyList from './message/notifyList';

export default combineReducers({
  forumList,
  topicList,
  notifyList,

  user,
  topicItem,
  comment,
  search,
  vote
});
