import { combineReducers } from 'redux';
import loading from './loading';
import classification from './classification';
import { connectRouter } from 'connected-react-router';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  classification,
  loading
});
