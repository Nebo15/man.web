import React, { PropTypes } from 'react';
import classnames from 'classnames';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';
import Table, { TableRow } from 'components/Table';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */

const ActionsColumnData = ({ isOpened }) => (<span className={classnames(styles.arrow, isOpened && styles['arrow-active'])}>
  <Icon name="arrow-down" />
</span>);
const FoldingRowComponent = ({ columns, data, onOpen, onClose, isOpened, component = 'div' }) => (
  <tbody>
    <TableRow
      data={{
        ...data,
        __actions: <ActionsColumnData isOpened={isOpened} />,
      }}
      className={classnames(styles.row, isOpened && styles.active)}
      columns={columns}
      onClick={!isOpened ? onOpen : onClose}
    />
    {
      <tr hidden={!isOpened} className={styles['row-sub']}>
        <td colSpan={columns.length}>{ isOpened && React.createElement(component, data) }</td>
      </tr>
    }
  </tbody>
);

class FoldingRow extends React.Component {
  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  state = {
    isOpened: false,
  };
  onOpen() {
    this.setState({ isOpened: true });
  }
  onClose() {
    this.setState({ isOpened: false });
  }
  render() {
    return (
      <FoldingRowComponent
        {...{
          ...this.state,
          ...this.props,
          onClose: this.onClose,
          onOpen: this.onOpen,
        }}
      />
    );
  }
}

const FoldingTable = ({
  columns = [],
  data = [],
  detailsColumn = {},
  component,
  keyColumn,
  ...rest,
}) => (
  <Table
    tbody={false}
    columns={[
      ...columns,
      { key: '__actions', title: 'Show details', ...detailsColumn },
    ]}
    {...rest}
  >
    {data.map((item, key) => (
      <FoldingRow
        key={item[keyColumn] || key}
        data={item}
        component={component}
      />
    ))}
  </Table>
);

/* eslint-disable react/no-unused-prop-types */

FoldingTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      align: PropTypes.oneOf(['left', 'center', 'right']),
      colspan: PropTypes.number,
    })
  ),

  data: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
};

export default withStyles(styles)(FoldingTable);
