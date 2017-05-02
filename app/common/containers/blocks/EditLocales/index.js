import React from 'react';
import classnames from 'classnames';
import findFn from 'lodash/find';
import getFn from 'lodash/get';
import { compose } from 'helpers/functions';

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
      dropdownOpened: false,
      toDelete: null,
    };
  }
  onAddLocale({ code }) {
    this.props.fields.push({
      code,
      params: compose(this.clearObject, getFn)(this.currentLocale, 'params', {}),
    });
    this.closeDropdown();
    this.selectLocale(code);
    return false;
  }
  get currentLocale() {
    return findFn(this.props.fields.getAll(), { code: this.props.locale }, null);
  }
  clearObject(object) {
    if (typeof object !== 'object') return {};
    return Object.keys(object).reduce((prev, key) => ({
      ...prev,
      [key]: '',
    }), {});
  }
  selectLocale(locale) {
    this.props.onChangeLocale(locale);
  }
  showDeleteConfirm(index) {
    this.setState({
      toDelete: index,
    });
  }
  deleteLocale(locale) {
    this.setState({
      toDelete: null,
    }, () => {
      const locales = this.props.fields.getAll();
      const deleteLocaleObj = findFn(locales, { code: locale });
      const deleteLocaleIdx = locales.indexOf(deleteLocaleObj);
      this.props.fields.remove(deleteLocaleIdx);
      if (this.props.locale !== locale) return;
      if (this.props.fields.length <= 1) {
        this.selectLocale(null);
      }
      this.selectLocale(locales[Math.max(deleteLocaleIdx - 1, 0)].code);
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
          { codes.map(code =>
            <li
              className={classnames(
                styles.select__item,
                this.props.locale === code && styles.active
              )}
              key={code}
            >
              <span
                className={styles.select__item__text}
                onClick={() => this.selectLocale(code)}
              >{code}</span>
              <span
                className={styles.select__item__close}
                onClick={() => this.showDeleteConfirm(code)}
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
    const { fields, locale } = this.props;
    const values = fields.getAll() || [];
    const selected = findFn(values, { code: locale });
    const indexOfSelectedLocal = values.indexOf(selected);

    return (
      <div className={styles.main}>
        {this.renderSelect(values)}
        <div className={styles.editor}>
          {
            indexOfSelectedLocal !== -1 && <Field
              name={`${fields.name}[${indexOfSelectedLocal}].params`}
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
              title={`Are you sure want to delete ${this.state.toDelete} locale`}
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
