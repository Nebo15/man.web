import React from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import OuterClick from 'components/OuterClick';

import styles from './styles.scss';

const Component = ({ children = [], control, isOpened, onOpen, onClose }) => (
  <OuterClick onClick={() => onClose()}>
    <section className={classnames(styles.dropdown, isOpened && styles.active)}>
      <DropDownControl onClick={() => (isOpened ? onClose() : onOpen())}>
        {control}
      </DropDownControl>
      <ul>
        { children }
      </ul>
    </section>
  </OuterClick>
);

export default withStyles(styles)(Component);

export const DropDownControl = ({ children, ...props }) => (
  <div className={styles.control} {...props}>{children}</div>
);

export const DropDownItem = ({ children, active = false, separate = false }) => (
  <li
    className={classnames(
      styles.item,
      active && styles.active,
      separate && styles.separate
    )}
  >
    {children}
  </li>
);
