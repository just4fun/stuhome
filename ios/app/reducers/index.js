import { combineReducers } from 'redux';
import forum from './forum';
import topic from './topic';

export default combineReducers({
  forum,
  topic
});
