import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from 'components/NavItem';

import styles from './styles.scss';

@withStyles(styles)
@connect(state => ({
  location: state.routing,
}))
export default class Nav extends React.Component {
  componentWillReceiveProps(props) {
    if (props.isOpen) {
      document.documentElement.classList.add(styles.navIsOpen);
    } else {
      document.documentElement.classList.remove(styles.navIsOpen);
    }
  }
  render() {
    const { isOpen } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="templates" activeClassName={styles.active}>
            <Link id="templates-nav" to="/templates">
              Templates
            </Link>
          </NavItem>
          <li>
            <a href="http://docs.man2.apiary.io" rel="noopener noreferrer" target="__blank">
              Documentation
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
