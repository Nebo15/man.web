import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';

import labels from 'redux/labels';
import templates from 'redux/templates';

import Aside from 'containers/blocks/Aside/redux';

import TemplateListPage from 'containers/pages/TemplateListPage/redux';
import TemplateEditPage from 'containers/pages/TemplateEditPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  TemplateListPage,
  TemplateEditPage,
});

const data = combineReducers({
  labels,
  templates,
});

export default combineReducers({
  blocks,
  pages,
  data,
  // external libraries
  form,
  routing,
  loading,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getTemplate = (state, id) => denormalize(id, schemas.template, state.data);
export const getTemplates = (state, ids) => denormalize(ids, [schemas.template], state.data);
