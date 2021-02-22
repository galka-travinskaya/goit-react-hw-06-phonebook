import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import initialContacts from '../../data/contacts.json';
import actions from './contacts-actions';

const items = createReducer(initialContacts, {
  [actions.addContact]: (state, { payload }) => [...state, payload],
  [actions.deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
