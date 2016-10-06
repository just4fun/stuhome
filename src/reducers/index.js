import { combineReducers } from 'redux';
import user from './user';
import forumList from './forumList';
import topicList from './topic/topicList';
import topicItem from './topic/topicItem';
import comment from './topic/comment';
import search from './topic/search';
import vote from './topic/vote';

export default combineReducers({
  forumList,
  topicList,

  user,
  topicItem,
  comment,
  search,
  vote
});
