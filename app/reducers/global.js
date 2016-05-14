import {
  TOGGLE_SIDE_MENU
} from '../constants/ActionTypes';

function global(state = {
  isSideMenuOpen: false
}, action) {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    default:
      return state;
  }
}

module.exports = global;
