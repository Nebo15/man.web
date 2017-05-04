import React from 'react';
import withStyles from 'withStyles';
import classnames from 'classnames';

import styles from './styles.scss';

@withStyles(styles)
export default class FullScreen extends React.Component {
  static defaultProps = {
    active: false,
  };
  componentDidMount(props) {
    return this.updateHtml(props);
  }
  componentWillReceiveProps(props) {
    return this.updateHtml(props);
  }
  updateHtml(props = {}) {
    if (props.active) {
      document.documentElement.classList.add(styles.html_no_scroll);
    } else {
      document.documentElement.classList.remove(styles.html_no_scroll);
    }
  }
  render() {
    const { active, children } = this.props;
    return (
      <div className={classnames(styles.fullscreen, active && styles['fullscreen--active'])}>
        {children}
      </div>
    );
  }
}
