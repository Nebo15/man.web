import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const Component = ({ tags = [], formatter = i => i }) => (<div className={styles.list}>
  { tags.map((tag, idx) => <div className={styles.item} key={idx}>{formatter(tag)}</div>) }
</div>);

export default withStyles(styles)(Component);
