import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray, getFormValues } from 'redux-form';

import Form, { FormRow, FormButtons } from 'components/Form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldTextarea from 'components/reduxForm/FieldTextarea';
import FieldCode from 'components/reduxForm/FieldCode';

import FieldSelect from 'components/reduxForm/FieldSelect';

import Button, { ButtonsGroup } from 'components/Button';
import Line from 'components/Line';

import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';
import EditLocales from 'containers/blocks/EditLocales';

import { reduxFormValidate, collectionOf, arrayOf } from 'react-nebo15-validate';

import styles from './styles.scss';

const syntaxToCodemirrorMode = {
  mustache: {
    name: 'handlebars',
    base: 'text/html',
    htmlMode: true,
    matchClosing: true,
    alignCDATA: true,
  },
  markdown: 'markdown',
};

const transformSyntaxToCodemirrorMode = syntax => syntaxToCodemirrorMode[syntax];

@withStyles(styles)
@reduxForm({
  form: 'template-form',
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
    body: {
      required: true,
    },
    locals: collectionOf({
      code: {
        required: true,
      },
      params: {
        required: true,
        json: true,
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
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      saved: props.initialValues,
    };
  }
  onSubmit(values) {
    return this.props.onSubmit({
      ...values,
      locales: values.locales && values.locales.map(i => ({
        ...i,
        params: typeof i.params === 'string' ? JSON.parse(i.params) : i.params,
      })),
    }).then(() => {
      this.setState({
        saved: values,
      });
    });
  }
  get isChanged() {
    const { values = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.saved);
  }
  render() {
    const { handleSubmit, onDelete, values, isEdit, submitting } = this.props;
    const placeholderTemplate = {
      markdown: `# {{l10n.hello}}, {{name}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `,
      mustache: `<html>
  <body>
    <h1>{{l10n.hello}}, {{name}}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </body>
</html>`,
    };
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Line />
        <FormRow>
          <Field
            name="title"
            labelText="Title"
            component={FieldInput}
            placeholder="eg. Sign up email template"
          />
        </FormRow>
        <FormRow>
          <Field
            name="description"
            labelText="Description"
            rows={3}
            component={FieldTextarea}
            placeholder="eg. This template will be sent to user's email after success sign up to confirm email"
          />
        </FormRow>
        <FormRow>
          <Field
            labelText="Syntax"
            name="syntax"
            placeholder="Select template syntax"
            component={FieldSelect}
            options={[
              { name: 'mustache', title: 'Mustache' },
              { name: 'markdown', title: 'Markdown' },
            ]}
          />
        </FormRow>
        <FormRow>
          <Field
            labelText="Template"
            name="body"
            placeholder={placeholderTemplate[values.syntax]}
            component={FieldCode}
            mode={transformSyntaxToCodemirrorMode(values.syntax)}
          />
        </FormRow>
        <FormRow><FieldArray name="locales" component={EditLocales} /></FormRow>
        <FormButtons>
          <ButtonsGroup>
            {isEdit && <Button type="submit" disabled={!this.isChanged}>
              {submitting ? 'Saving...' : (this.isChanged ? 'Save Template' : 'Saved')}
            </Button>}
            {!isEdit && <Button type="submit" disabled={!this.isChanged}>Create Template</Button>}
            {isEdit && <Button id="delete-template-button" type="button" onClick={onDelete} color="red">Delete Template</Button>}
          </ButtonsGroup>
        </FormButtons>

        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
      </Form>
    );
  }
}
