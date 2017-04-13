import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import loading from 'redux/loading';

import labels from 'redux/labels';
import templates from 'redux/templates';

const blocks = combineReducers({
  loading,
});

export default combineReducers({
  blocks,
  // external libraries
  form,
  routing,
  // data
  labels,
  templates,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];
