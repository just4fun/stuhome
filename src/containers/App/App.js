import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '~/store/configureStore';
import rootEpic from '~/modules/root/rootEpic';
import Navigator from '~/containers/Navigator/Navigator';

const store = configureStore();
store.runEpic(rootEpic);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
