import { push } from 'react-router-redux';
import * as fromTemplates from 'redux/templates';

export const updateTemplate = (templateId, values) => dispatch =>
  dispatch(fromTemplates.updateTemplate(templateId, values)).then((action) => {
    if (action.error) return action;
    return dispatch(push('/templates'));
  });
