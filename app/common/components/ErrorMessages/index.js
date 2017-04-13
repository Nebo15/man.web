import React from 'react';
import { translate } from 'react-i18next';
import { ErrorMessages, ErrorMessage } from 'modules/validate';

@translate()
export default class ErrorMessagesTranslated extends React.Component {
  render() {
    const { children, t, ...rest } = this.props;
    return (
      <ErrorMessages {...rest}>
        {children}
        <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
        <ErrorMessage when="email">{t('Invalid email format')}</ErrorMessage>
        <ErrorMessage when="userName">{t('Invalid surname')}</ErrorMessage>
        <ErrorMessage when="maxLength">{t('Length must be less than <%= params %>')}</ErrorMessage>
        <ErrorMessage when="card_number">{ t('Invalid card number') }</ErrorMessage>
        <ErrorMessage when="uniqueCardName">{t('Card with such names already exist')}</ErrorMessage>
        <ErrorMessage when="uniqueCardNumber">{t('Card with such number already exist')}</ErrorMessage>
        <ErrorMessage when="cardType">
          {t('Support only {{types}} cards', { types: this.props.error.cardType && this.props.error.cardType.join(', ') })}
        </ErrorMessage>
      </ErrorMessages>
    );
  }
}
