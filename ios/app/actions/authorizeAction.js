import { AsyncStorage } from 'react-native';
import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,

  SET_AUTHRIZATION,
  REQUEST_LOGOUT,
  RESET_AUTHRIZATION
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

function setAuthrization(user) {
  return {
    type: SET_AUTHRIZATION,
    user
  };
}

export function getUserFromStorage() {
  return dispatch => {
    AsyncStorage.getItem('authrization')
      .then(authrization => {
        if (authrization) {
          authrization = JSON.parse(authrization);
          dispatch(setAuthrization(authrization));
        }
      });
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

export function resetAuthrization() {
  return {
    type: RESET_AUTHRIZATION
  };
}
