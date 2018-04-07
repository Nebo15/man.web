import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import TemplateForm from 'containers/forms/TemplateForm';

import { getTemplate } from 'reducers';

import { fetchTemplate } from 'redux/templates';
import { updateTemplate, deleteTemplate } from './redux';

@provideHooks({
  fetch: ({ dispatch, params: { templateId } }) => dispatch(fetchTemplate(templateId)),
})
@connect((state, { params: { templateId } }) => ({
  template: getTemplate(state, templateId),
}), { updateTemplate, deleteTemplate })
export default class TemplateEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onSubmit(values) {
    return this.props.updateTemplate(this.props.params.templateId, values);
  }
  onDelete() {
    return this.props.deleteTemplate(this.props.params.templateId);
  }
  render() {
    const { template } = this.props;
    return (
      <FormPageWrapper id="template-edit-page" title={`Edit ${template.title} template`} back="/templates">
        <TemplateForm
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          isEdit
          initialValues={template}
        />
      </FormPageWrapper>
    );
  }
}
