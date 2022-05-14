import { createStore } from 'redux';
import { combineReducers } from 'redux';
import mapReducer from './reducers/mapReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    map: mapReducer,
  },
});
