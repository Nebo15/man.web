import React from 'react';
import { chain } from 'lodash';

import withStyles from 'withStyles';
import mustache from 'mustache';
import { markdown } from 'markdown';

import Icon from 'components/Icon';
import IFrame from 'components/IFrame';


import styles from './styles.scss';

@withStyles(styles)
export default class TemplatePreview extends React.Component {

  render() {
    const { template, locale } = this.props;
    let html = '';
    const variables = {
      l10n: chain(template.locales).find({ code: locale }).get('params').value(),
    };

    try {
      switch (template.syntax) {
        case 'mustache':
          html = mustache.render(template.body, variables);
          break;
        case 'markdown':
          html = markdown.toHTML(template.body);
          break;
        default: {
          console.warn('Unspecific template syntax type', template.syntax); // eslint-disable-line
        }
      }
    } catch (e) {
      console.warn('error while render template', e); //eslint-disable-line
    }

    return (<div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.header__cell}>
          <Icon name="eye" />
        </div>
        <div className={styles.header__cell}>Preview</div>
      </div>
      <div className={styles.preview}>
        <IFrame
          className={styles.preview__frame}
          content={html}
        />
      </div>
    </div>);
  }
}
