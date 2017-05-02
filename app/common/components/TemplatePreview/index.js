import React from 'react';
import { chain } from 'lodash';

import classnames from 'classnames';

import withStyles from 'withStyles';
import mustache from 'mustache';
import { markdown } from 'markdown';

import Icon from 'components/Icon';
import IFrame from 'components/IFrame';
import FullScreen from 'components/FullScreen';

import styles from './styles.scss';

@withStyles(styles)
export default class TemplatePreview extends React.Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.reduce = this.reduce.bind(this);
    this.state = {
      fullScreen: false,
    };
  }
  expand() {
    this.setState({
      fullScreen: true,
    });
  }
  reduce() {
    this.setState({
      fullScreen: false,
    });
  }
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

    return (<FullScreen active={this.state.fullScreen}>
      <div className={classnames(styles.wrap, this.state.fullScreen && styles['wrap--fullscreen'])}>
        <div className={styles.header}>
          <div className={classnames(styles.header__cell, styles['header__cell--icon'])}>
            <Icon name="eye" />
          </div>
          <div className={styles.header__cell}>Preview</div>
          <div
            className={classnames(
              styles.header__cell,
              styles['header__cell--icon'],
              styles['header__cell--icon--fullScreen']
            )}
            onClick={this.state.fullScreen ? this.reduce : this.expand}
          >
            <Icon name={this.state.fullScreen ? 'arrows-reduce' : 'arrows-expand'} />
          </div>
        </div>
        <IFrame
          className={styles.preview}
          content={html}
        />
      </div>
    </FullScreen>);
  }
}
