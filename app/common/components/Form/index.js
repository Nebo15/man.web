import React from 'react';
import withStyles from 'withStyles';
import classnames from 'classnames';
import Icon from 'components/Icon';

import styles from './styles.scss';

const FormComponent = props =>
  <form className={classnames(styles.form)} {...props} />;

export default withStyles(styles)(FormComponent);


const FormBlockComponent = ({ title, children, border, ...rest }) =>
  <div
    className={classnames(
      styles.block,
      border && styles.block_border
    )}
    {...rest}
  >
    { title && <FormBlockTitle>{title}</FormBlockTitle>}
    <div className={styles.block__content}>{ children }</div>
  </div>;

export const FormBlock = withStyles(styles)(FormBlockComponent);


const FormRowComponent = props => <div className={styles.row} {...props} />;

export const FormRow = withStyles(styles)(FormRowComponent);

const FormBlockTitleComponent = ({ children, right, ...rest }) =>
  <div className={styles.blockTitle} {...rest}>
    <div className={styles.blockTitle__text}>{ children }</div>
    { right && <div className={styles.blockTitle__right}>{ right }</div> }
  </div>;

export const FormBlockTitle = withStyles(styles)(FormBlockTitleComponent);


const sizeToClassName = (size) => {
  const [part, count] = size.split('/');
  return styles[`column_${part}-${count}`];
};

const FormColumnComponent = ({ size, ...rest }) =>
  <div className={classnames(styles.column, size && sizeToClassName(size))} {...rest} />;

export const FormColumn = withStyles(styles)(FormColumnComponent);


const FormButtonsComponent = props =>
  <div className={classnames(styles.buttons)} {...props} />;

export const FormButtons = withStyles(styles)(FormButtonsComponent);

const FormIconComponent = ({ icon = 'add', color = 'green', children, ...rest }) =>
  <a className={styles.icon} {...rest}>
    <span
      className={classnames(styles.icon__symbol,
        color && styles[`icon_color-${color}`])}
    >
      <Icon name={icon} />
    </span>
    <span className={styles.icon__text}>{ children }</span>
  </a>;

export const FormIcon = withStyles(styles)(FormIconComponent);
