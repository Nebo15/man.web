import React from 'react';
import MaskedInputComponent from 'react-nebo15-mask';
import Input from 'components/Input';

export default props => (
  <Input component={MaskedInputComponent} {...props} />
);
