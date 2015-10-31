import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,

  REQUEST_LOGOUT
} from '../constants/ActionTypes';
import { API_ROOT } from '../config';

const API_PATH = 'user/login';

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function receiveLogin(user) {
  return {
    type: RECEIVE_LOGIN,
    user
  };
}

export function userLogin(userName, password) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(API_ROOT + API_PATH + `&username=${userName}&password=${password}`)
      .then(response => response.json())
      .then(json => dispatch(receiveLogin(json)));
  };
}

export function userLogout() {
  return {
    type: REQUEST_LOGOUT
  };
}
