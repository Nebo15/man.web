import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { label } from 'schemas';
import { invoke } from './api';

export const fetchLabels = options => invoke({
  endpoint: createUrl(`${API_URL}/labels`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['labels/FETCH_LIST_REQUEST', {
    type: 'labels/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [label])
    ),
  }, 'labels/FETCH_LIST_FAILURE'],
});

export default handleAction(
  combineActions(
    'labels/FETCH_LIST_SUCCESS',
    'templates/FETCH_LIST_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.labels,
  }),
  {}
);
