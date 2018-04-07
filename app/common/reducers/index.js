import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';
//
// const blocks = combineReducers({
// });
//
// const pages = combineReducers({
// });
//
// const data = combineReducers({
// });

export default combineReducers({
  // blocks,
  // pages,
  // data,
  // external libraries
  form,
  routing,
  loading,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getTemplate = (state, id) => denormalize(id, schemas.template, state.data);
export const getTemplates = (state, ids) => denormalize(ids, [schemas.template], state.data);
