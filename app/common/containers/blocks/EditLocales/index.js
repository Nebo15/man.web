import React from 'react';
import classnames from 'classnames';

import { Field } from 'redux-form';

import withStyles from 'withStyles';

import Icon from 'components/Icon';
import FieldCode from 'components/reduxForm/FieldCode';
import AddLanguageForm from 'containers/forms/AddLanguageForm';
import { Confirm } from 'components/Popup';

import styles from './styles.scss';

const LanguageDropdown = ({ locales, onAdd }) => (
  <div className={styles.dropdown}>
    <AddLanguageForm onSubmit={onAdd} existingLocales={locales} />
  </div>
);

@withStyles(styles)
export default class EditLocales extends React.Component {
  constructor(props) {
    super(props);
    this.selectLocale = this.selectLocale.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onAddLocale = this.onAddLocale.bind(this);

    this.state = {
      selectedLocal: props.fields.length ? 0 : null,
      dropdownOpened: false,
      toDelete: null,
    };
  }
  onAddLocale(code) {
    this.props.fields.push({
      code: code.code,
      params: {},
    });
    this.closeDropdown();
    this.selectLocale(this.props.fields.length);
    return false;
  }
  selectLocale(index) {
    this.setState({
      selectedLocal: index,
    });
  }
  showDeleteConfirm(index) {
    this.setState({
      toDelete: index,
    });
  }
  deleteLocale(index) {
    this.setState({
      toDelete: null,
    }, () => {
      this.props.fields.remove(index);
      const newIndex = (index - 1);
      if (this.props.fields.length <= 1) {
        this.selectLocale(null);
      } else {
        this.selectLocale(newIndex === -1 ? 0 : newIndex);
      }
    });
  }
  openDropdown() {
    this.setState({
      dropdownOpened: true,
    });
  }
  closeDropdown() {
    this.setState({
      dropdownOpened: false,
    });
  }
  toggleDropdown() {
    this.setState({
      dropdownOpened: !this.state.dropdownOpened,
    });
  }
  renderSelect(locales = []) {
    const codes = locales.map(i => i.code);
    return (
      <div className={styles.select}>
        <ul className={styles.select__list}>
          { codes.map((code, index) =>
            <li
              className={classnames(
                styles.select__item,
                codes[this.state.selectedLocal] === code && styles.active
              )}
              key={code}
            >
              <span
                className={styles.select__item__text}
                onClick={() => this.selectLocale(index)}
              >{code}</span>
              <span
                className={styles.select__item__close}
                onClick={() => this.showDeleteConfirm(index)}
              >&#10006;</span>
            </li>
          )}
        </ul>
        <div
          className={classnames(
            styles.select__add,
            this.state.dropdownOpened && styles['select__add--active']
          )}
        >
          <div
            className={styles.select__add__control}
            onClick={this.toggleDropdown}
          >
            <span className={styles.select__add__text}>Add language</span>
            <span className={styles.select__add__icon}><Icon name="add" /></span>
          </div>
          <div className={styles.select__add__dropdown}>
            { this.state.dropdownOpened &&
              <LanguageDropdown locales={codes} onAdd={this.onAddLocale} />
            }
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { fields } = this.props;
    const { selectedLocal } = this.state;
    const values = fields.getAll() || [];
    return (
      <div className={styles.main}>
        {this.renderSelect(values)}
        <div className={styles.editor}>
          {
            selectedLocal !== null && <Field
              name={`${fields.name}[${selectedLocal}].params`}
              placeholder={`Type in locale object

{
  "hello": "Hello"
}
              `}
              component={FieldCode}
              mode={{
                name: 'application/json',
                json: true,
              }}
            />
          }
          { values.length === 0 && (
            <div
              className={styles.editor__placeholder}
              onClick={this.openDropdown}
            >Add language</div>
          )}
        </div>
        {
          this.state.toDelete !== null && (
            <Confirm
              title={`Are you sure want to delete ${values[this.state.toDelete].code} locale`}
              active={this.state.toDelete !== null}
              theme="error"
              confirm="Ok"
              id="confirm-leave"
              onCancel={() => this.setState({ toDelete: null })}
              onConfirm={() => this.deleteLocale(this.state.toDelete)}
            >Are you sure want to leave this localization?</Confirm>
          )
        }
      </div>
    );
  }
}
