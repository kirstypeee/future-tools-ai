import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import history from '../history';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (initialState: any) => {
  return createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        promiseMiddleware
      ),
    ),
  )
}