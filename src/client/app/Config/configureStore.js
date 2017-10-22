import { createStore } from 'redux';
import rootReducer from './reducerCombinator';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}