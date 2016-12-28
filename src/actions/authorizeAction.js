import { AsyncStorage } from 'react-native';
import { HOST, API_PREFIX } from '../config';
import request from '../utils/request';
import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  FAILURE_LOGIN,
  SET_AUTHRIZATION,
  REMOVE_CACHE,
  RESET_AUTHRIZATION,
  RESET_AUTHRIZATION_RESULT
} from '../constants/ActionTypes';

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

function failureLogin() {
  return {
    type: FAILURE_LOGIN
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

    return request({
      url: `${HOST}${API_PREFIX}${API_PATH}&username=${userName}&password=${password}`,
      successCallback: data => dispatch(receiveLogin(data)),
      failureCallback: () => dispatch(failureLogin())
    });
  };
}

export function resetAuthrization() {
  return {
    type: RESET_AUTHRIZATION
  };
}

export function resetAuthrizationResult() {
  return {
    type: RESET_AUTHRIZATION_RESULT
  };
}

export function cleanCache(isLogin) {
  return {
    type: REMOVE_CACHE,
    isLogin
  };
}
