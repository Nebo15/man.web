import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromTemplates from 'redux/templates';

export const showTemplates = createAction('templateListPage/SHOW_TEMPLATES');

export const fetchTemplates = () => dispatch =>
  dispatch(fromTemplates.fetchTemplates({ limit: 100 }))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(showTemplates(action.payload.result));
  });

const templates = handleAction(showTemplates, (state, action) => action.payload, []);

export default combineReducers({
  templates,
});
