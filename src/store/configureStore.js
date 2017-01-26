import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}) {
  const middlewares = [
    thunkMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );
}
