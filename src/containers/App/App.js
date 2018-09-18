import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '~/store/configureStore';
import rootEpic from '~/modules/root/rootEpic';
import Navigator from '~/containers/Navigator/Navigator';

const store = configureStore();
store.runEpic(rootEpic);

export default App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)
