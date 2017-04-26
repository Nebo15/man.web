import React from 'react';
import { connect } from 'react-redux';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import TemplateForm from 'containers/forms/TemplateForm';

import { createTemplate } from './redux';

@connect(null, { createTemplate })
export default class TemplateCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    return this.props.createTemplate(values);
  }
  render() {
    const initialValues = {
      name: null,
      syntax: 'mustache',
      // locales: [
      //   {
      //     code: 'en_US',
      //     params: {
      //       Hello: 'Hello',
      //     },
      //   },
      // ],
    };

    return (
      <FormPageWrapper id="template-add-page" title="Add new template" back="/templates">
        <TemplateForm onSubmit={this.onSubmit} initialValues={initialValues} />
      </FormPageWrapper>
    );
  }
}
