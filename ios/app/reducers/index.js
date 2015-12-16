import { combineReducers } from 'redux';
import route from './route';
import user from './user';
import forumList from './forumList';
import topicList from './topicList';
import topicItem from './topicItem';
import comment from './comment';

export default combineReducers({
  route,

  forumList,
  topicList,

  user,
  topicItem,
  comment
});
