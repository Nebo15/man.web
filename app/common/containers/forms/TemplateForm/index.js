import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, getFormValues } from 'redux-form';

import Form, { FormRow, FormButtons } from 'components/Form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldTextarea from 'components/reduxForm/FieldTextarea';
import FieldCode from 'components/reduxForm/FieldCode';


import FieldSelect from 'components/reduxForm/FieldSelect';

import Button, { ButtonsGroup } from 'components/Button';
import Line from 'components/Line';

import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';

import { reduxFormValidate, collectionOf, arrayOf } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'template-form',
  initialValues: {
    syntax: 'mustache_to_html',
  },
  validate: reduxFormValidate({
    title: {
      required: true,
      minLength: 4,
    },
    description: {
      minLength: 4,
    },
    validationSchema: {
      json: true,
    },
    locals: collectionOf({
      locale: {
        required: true,
      },
    }),
    labels: arrayOf({
      minLength: 4,
    }),
  }),
})
@connect(state => ({
  values: getFormValues('template-form')(state),
}))
export default class TemplateForm extends React.Component {
  get isChanged() {
    const { values = {}, initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { handleSubmit, onSubmit, onDelete, isEdit, children, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Line />
        <FormRow>
          <Field name="title" labelText="Title" component={FieldInput} />
        </FormRow>
        <FormRow>
          <Field name="description" labelText="Description" rows={3} component={FieldTextarea} />
        </FormRow>
        <FormRow>
          <Field
            labelText="Syntax"
            name="syntax"
            placeholder="Select template syntax"
            component={FieldSelect}
            options={[
              { name: 'mustache_to_html', title: 'Mustache' },
              { name: 'markdown', title: 'Markdown' },
            ]}
          />
        </FormRow>
        <FormRow>
          <Field
            labelText="Template"
            name="body"
            placeholder="Type in template value"
            component={FieldCode}
            mode={{
              name: 'handlebars', base: 'text/html',
              htmlMode: true,
              matchClosing: true,
              alignCDATA: true,
            }}
          />
        </FormRow>

        {
          children && <div className={styles.row}>
            {children}
          </div>
        }

        <FormButtons>
          <ButtonsGroup>
            <Button type="submit" disabled={!this.isChanged}>
              {isEdit ? 'Save Template' : 'Create Template'}
            </Button>
            {isEdit && <Button id="delete-template-button" type="button" onClick={onDelete} color="red">Delete Template</Button>}
          </ButtonsGroup>
        </FormButtons>

        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
      </Form>
    );
  }
}
