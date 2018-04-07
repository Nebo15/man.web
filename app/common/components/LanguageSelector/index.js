import React from 'react';
import withStyles from 'withStyles';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { changeLanguage } from 'redux/language';

import styles from './styles.scss';

const LANGS = {
  uk: 'УКР',
  ru: 'РУС',
  en: 'ENG',
};

const Item = ({ lang, active, onChange }) => (
  <button
    onClick={() => onChange(lang)}
    className={classnames(
      styles.langs__item,
      active && styles.active,
    )}
  >{LANGS[lang]}</button>
);

@translate()
@withStyles(styles)
@connect(null, {
  changeLanguage,
})
export default class LanguageSelector extends React.Component {

  render() {
    const {
      i18n, changeLanguage,
      itemComponent = Item,
      onChange = () => {},
    } = this.props;

    return (
      <div className={styles.langs}>
        {
          i18n.options.whitelist.filter(lang => Boolean(LANGS[lang])).map(lang =>
            React.createElement(itemComponent, {
              lang,
              active: i18n.language === lang,
              key: lang,
              onChange: () => {
                changeLanguage(lang);
                onChange(lang);
              },
            })
          )
        }
      </div>
    );
  }
}
