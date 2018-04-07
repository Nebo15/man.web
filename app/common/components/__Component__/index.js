import React from 'react';
import withStyles from 'withStyles';
import styles from './styles.scss';

const Component = ({ children }) => (
  <div>
    { children }
  </div>
);

export default withStyles(styles)(Component);
