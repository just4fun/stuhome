import {
  CHANGE_ROUTE,
} from '../constants/ActionTypes';

export function changeRoute(route) {
  return {
    type: CHANGE_ROUTE,
    route
  };
}
