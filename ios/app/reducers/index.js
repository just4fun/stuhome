import { combineReducers } from 'redux';
import user from './user';
import forumList from './forumList';
import topicList from './topicList';
import topicItem from './topicItem';

export default combineReducers({
  forumList,
  topicList,

  user,
  topicItem
});
