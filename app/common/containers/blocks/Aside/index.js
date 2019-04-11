import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import Icon from 'components/Icon';
import Nav from 'containers/blocks/Nav';

import styles from './styles.scss';

@withStyles(styles)
@connect(state => state.blocks.Aside)
export default class Aside extends React.Component {

  render() {
    const { active } = this.props;
    return (
      <aside className={styles.aside}>
        { /* eslint-disable jsx-a11y/anchor-has-content */ }
        <Link className={styles.logo} to="/">{'{ mán }'}</Link>

        <Link to="/templates/create" className={styles.add}>
          <Icon name="add" /> Create
        </Link>

        <Nav isOpen={active} />

      </aside>
    );
  }
}
