import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import appReducer from './appReducer';


/**
 * @internal
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * @internal
 */
function getMiddlewares() {
  const middlewares = [ thunk ];

  if (IS_DEVELOPMENT_MODE === 'true') {
    middlewares.push(createLogger());
  }

  return middlewares;
}


export function createAppStore() {
  return createStore(
    appReducer,
    composeEnhancers(applyMiddleware(...getMiddlewares()))
  );
}
