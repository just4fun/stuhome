import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import Navigator from './Navigator';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
