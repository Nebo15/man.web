import React from 'react';
import { chain } from 'lodash';

import classnames from 'classnames';

import withStyles from 'withStyles';
import mustache from 'mustache';
import { markdown } from 'markdown';

import Icon from 'components/Icon';
import IFrame from 'components/IFrame';
import FullScreen from 'components/FullScreen';
import FieldCode from 'components/reduxForm/FieldCode';

import styles from './styles.scss';


// NOTE: simple solution. Get only root variable names
const getVariableNames = template =>
  mustache.parse(template)
  .filter(v => ['name', '#', '&'].indexOf(v[0]) > -1)
  .map(v => v[1]);

@withStyles(styles)
export default class TemplatePreview extends React.Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.reduce = this.reduce.bind(this);
    this.toggleTestVariables = this.toggleTestVariables.bind(this);
    this.onChangeTestVariables = this.onChangeTestVariables.bind(this);

    let testData;
    if (this.props.template.syntax === 'mustache') {
      const testVariables = getVariableNames(props.template.body);
      const filteredLocalization = testVariables
        .filter(key => !key.match(/^l10n/g))
        .reduce((prev, key) => ({
          ...prev,
          [key]: '',
        }), {});
      testData = JSON.stringify(filteredLocalization, null, 2);
    }

    this.state = {
      fullScreen: false,
      openTestVariables: false,
      testData,
    };
  }
  onChangeTestVariables(json) {
    this.setState({
      testData: json,
    });
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
  toggleTestVariables() {
    this.setState({
      openTestVariables: !this.state.openTestVariables,
    });
  }
  get testData() {
    try {
      return JSON.parse(this.state.testData);
    } catch (e) {
      return {};
    }
  }
  get isVariablesAvailable() {
    return this.props.template.syntax === 'mustache';
  }
  get html() {
    let html = '';
    const { template, locale } = this.props;
    if (!template.body) return html;

    try {
      switch (template.syntax) {
        case 'mustache':
          html = mustache.render(template.body || '', {
            l10n: chain(template.locales).find({ code: locale }).get('params').value(),
            ...this.testData,
          });
          break;
        case 'markdown':
          html = markdown.toHTML(template.body || '');
          break;
        default: {
          if (__DEV__) {
            console.warn('Unspecific template syntax type', template.syntax); // eslint-disable-line
          }
        }
      }
    } catch (e) {
      if (__DEV__) {
        console.warn('error while render template', e); //eslint-disable-line
      }
    }
    return html;
  }
  render() {
    return (<FullScreen active={this.state.fullScreen}>
      <div className={classnames(styles.wrap, this.state.fullScreen && styles['wrap--fullscreen'])}>
        <div className={styles.header}>
          <div className={classnames(styles.header__cell, styles['header__cell--icon'])}>
            <Icon name="eye" />
          </div>
          <div className={classnames(styles.header__cell, styles['header__cell--title'])}>Preview</div>
          {
            this.isVariablesAvailable && (
              <a
                className={classnames(
                  styles.header__cell,
                  this.state.openTestVariables && styles['header__cell--active'],
                )}
                onClick={this.toggleTestVariables}
              >Edit test variables</a>
            )
          }
          <a
            className={classnames(
              styles.header__cell,
              styles['header__cell--icon'],
              styles['header__cell--icon--fullScreen']
            )}
            onClick={this.state.fullScreen ? this.reduce : this.expand}
          >
            <Icon name={this.state.fullScreen ? 'arrows-reduce' : 'arrows-expand'} />
          </a>
        </div>
        <div className={styles.main}>
          <IFrame
            className={styles.preview}
            content={this.html}
          />
          { this.state.openTestVariables && this.isVariablesAvailable &&
            <div
              className={styles.sidebar}
            >
              <FieldCode
                theme="float"
                input={{
                  onChange: this.onChangeTestVariables,
                  value: this.state.testData,
                }}
                meta={{}}
                fullHeight
                options={{
                  mode: {
                    name: 'application/json',
                    json: true,
                  },
                  smartIndent: false,
                  lineNumbers: true,
                  gutters: [],
                  lint: false,
                }}
              />
            </div>
          }
        </div>
      </div>
    </FullScreen>);
  }
}
