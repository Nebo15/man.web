import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import withStyles from 'withStyles';

import styles from './styles.scss';

const App = ({ children }) => (<div>
  <Helmet
    htmlAttributes={{ lang: 'ru', amp: undefined }} // amp takes no value
  />
  { children }
</div>);

export default compose(
  withStyles(styles)
)(App);
