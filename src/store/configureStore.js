import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
    thunkMiddleware
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

  return store;
}
