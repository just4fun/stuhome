import { combineReducers } from 'redux';
import user from './user';
import forum from './forum';
import topicList from './topicList';
import topicItem from './topicItem';

export default combineReducers({
  user,
  forum,
  topicList,

  topicItem
});
