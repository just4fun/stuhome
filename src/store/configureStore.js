import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '~/modules/root/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
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

  store.runSaga = sagaMiddleware.run;
  store.runEpic = epicMiddleware.run;

  return store;
}
