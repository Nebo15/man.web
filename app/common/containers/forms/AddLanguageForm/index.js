import React from 'react';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field } from 'redux-form';

import Form, { FormRow, FormButtons } from 'components/Form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'add-language-form',
  validate: reduxFormValidate({
    code: {
      required: true,
      format: () => /^[a-z]{2}([-_][A-Z]{2})?$/,
      exclusion: props => props.existingLocales,
    },
  }),
})
export default class AddLanguageForm extends React.Component {
  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    return (
      <Form
        onSubmit={(e, ...args) => {
          e.preventDefault();
          e.stopPropagation();
          return handleSubmit(e, ...args);
        }}
      >
        <FormRow>
          <Field
            name="code"
            component={FieldInput}
            placeholder="eg. en_US"
          >
            <ErrorMessage when="exclusion">This error code is already used</ErrorMessage>
          </Field>
        </FormRow>
        <FormButtons>
          <Button
            type="submit"
            block
            disabled={submitting || invalid}
          >Add language</Button>
        </FormButtons>
      </Form>
    );
  }
}
