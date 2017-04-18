import React from 'react';
import { Field } from 'redux-form';

import withStyles from 'withStyles';

import Icon from 'components/Icon';
import DropDown, { DropDownControl, DropDownItem } from 'components/DropDown';
import FieldCode from 'components/reduxForm/FieldCode';

import styles from './styles.scss';

@withStyles(styles)
export default class EditLocales extends React.Component {
  constructor(props) {
    super(props);
    this.selectLocale = this.selectLocale.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.state = {
      selectedLocaleIndex: props.fields.length ? 0 : null,
      dropdownOpened: false,
    };
  }
  selectLocale(selectedLocale, selectedLocaleIndex) {
    this.setState({
      selectedLocaleIndex,
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
  renderSelect(locales) {
    return (
      <div className={styles.select}>
        <ul className={styles.select__list}>
          { locales.map((locale, index) =>
            <li
              className={styles.select__item}
              key={locale.code}
              onClick={() => this.selectLocale(locale, index)}
            ><span className={styles.select__text}>{locale.code}</span></li>
          )}
        </ul>
        <div className={styles.select__add}>
          <DropDown
            isOpened={this.state.dropdownOpened}
            onOpen={this.openDropdown}
            onClose={this.closeDropdown}
            control={<Icon name="add" />}
          >
            <DropDownItem>ru_RU</DropDownItem>
          </DropDown>
        </div>
      </div>
    );
  }
  render() {
    const { fields } = this.props;
    const { selectedLocaleIndex } = this.state;
    const values = fields.getAll();

    return (
      <div className={styles.main}>
        {this.renderSelect(values)}
        <div className={styles.editor}>
          {
            selectedLocaleIndex !== null && <Field
              name={`${fields.name}[${selectedLocaleIndex}].params`}
              placeholder="Type in locale object"
              component={FieldCode}
              mode="javascript"
            />
          }
        </div>
      </div>
    );
  }
}
