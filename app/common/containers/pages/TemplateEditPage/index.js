import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import TemplateForm from 'containers/forms/TemplateForm';

import { getTemplate } from 'reducers';

import { fetchTemplate } from 'redux/templates';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { templateId } }) => dispatch(fetchTemplate(templateId)),
})
@connect((state, { params: { templateId } }) => ({
  template: getTemplate(state, templateId),
}))
export default class TemplateEditPage extends React.Component {
  render() {
    const { template } = this.props;
    return (
      <FormPageWrapper id="template-edit-page" title={`Edit ${template.title} template`} back="/templates">
        <TemplateForm onSubmit={() => console.log(v)} initialValues={template} />
      </FormPageWrapper>
    );
  }
}
