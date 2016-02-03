import React, { Component } from 'react-native';
import Main from '../components/Main';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux/native';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Main />}
      </Provider>
    );
  }
}
