import { Middleware } from 'redux';
import _ from 'underscore';

export const logger: Middleware = store => next => action => {
  console.log('dispatching', action);
  console.log('next state', _.omit(store.getState(), '_persist'));
  
  let result = next(action);
  return result;
};
