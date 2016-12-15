import { AsyncStorage } from 'react-native';
import { API_ROOT } from '../config';
import { FAILURE } from '../constants/ActionTypes';

export function failure() {
  return {
    type: FAILURE
  };
}
