import React from 'react';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
export default class FormPageWrapper extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  goBack() {
    if (this.props.back) {
      this.context.router.push(this.props.back);
    } else {
      this.context.router.goBack();
    }
  }

  render() {
    const { title, children, back, ...props } = this.props; // eslint-disable-line

    return (
      <div {...props}>
        <H1>
          <span onClick={() => this.goBack()} className={styles.back}>
            <Icon name="arrow-left-large" />
          </span>
          <span className={styles.title}>{title}</span>
        </H1>
        {children}
      </div>
    );
  }
}
