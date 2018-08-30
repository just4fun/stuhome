import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '~/modules/root/rootReducer';

const epicMiddleware = createEpicMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [
    epicMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );

  store.runEpic = epicMiddleware.run;

  return store;
}
