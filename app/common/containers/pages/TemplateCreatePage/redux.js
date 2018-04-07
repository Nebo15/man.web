import { push } from 'react-router-redux';
import * as fromTemplates from 'redux/templates';

export const createTemplate = values => dispatch =>
  dispatch(fromTemplates.createTemplate(values)).then((action) => {
    if (action.error) return action;
    const newTemplateId = action.payload.result;
    return dispatch(push(`/templates?template=${newTemplateId}`));
  });
