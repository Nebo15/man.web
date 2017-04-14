import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { template } from 'schemas';
import { invoke } from './api';

export const fetchTemplates = options => invoke({
  endpoint: createUrl(`${API_URL}/templates`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['templates/FETCH_LIST_REQUEST', {
    type: 'templates/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [template])
    ),
  }, 'templates/FETCH_LIST_FAILURE'],
});

export const fetchApi = (apiId, options) => invoke({
  endpoint: createUrl(`${API_URL}/templates/${apiId}`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['templates/FETCH_DETAILS_REQUEST', {
    type: 'templates/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, template)
    ),
  }, 'templates/FETCH_DETAILS_FAILURE'],
});

export const createApi = (body, options) => invoke({
  endpoint: createUrl(`${API_URL}/templates`, options),
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body,
  types: ['templates/CREATE_REQUEST', {
    type: 'templates/CREATE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, template)
    ),
  }, 'templates/CREATE_FAILURE'],
});

export const updateApi = (apiId, body, options) => invoke({
  endpoint: createUrl(`${API_URL}/templates/${apiId}`, options),
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body,
  types: ['templates/UPDATE_REQUEST', {
    type: 'templates/UPDATE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, template)
    ),
  }, 'templates/UPDATE_FAILURE'],
});

export const deleteApi = (apiId, body, options) => invoke({
  endpoint: createUrl(`${API_URL}/templates/${apiId}`, options),
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  body,
  types: ['templates/DELETE_REQUEST', 'templates/DELETE_SUCCESS', 'templates/DELETE_FAILURE'],
});

export default handleAction(
  combineActions(
    'templates/FETCH_LIST_SUCCESS',
    'templates/FETCH_DETAILS_SUCCESS',
    'templates/CREATE_SUCCESS',
    'templates/UPDATE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.templates,
  }),
  {}
);
