import { combineReducers } from 'redux';
import user from './user';
import forum from './forum';
import topic from './topic';

export default combineReducers({
  user,
  forum,
  topic
});
