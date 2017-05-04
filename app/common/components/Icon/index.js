import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import styles from './icons.font';

export const icons = [
  'arrow-left',
  'arrow-left-large',
  'arrow-right',
  'arrow-down',
  'check-right',
  'add',
  'doc',
  'trash',
  'nebo15',
  'eye',
  'arrows-expand',
  'arrows-reduce',
];

const Icon = ({ name }) => React.createElement('i', {
  className: classnames(styles.icon, styles[`icon-${name}`]),
});

Icon.propTypes = {
  name: PropTypes.oneOf(icons).isRequired,
};

export default withStyles(styles)(Icon);
