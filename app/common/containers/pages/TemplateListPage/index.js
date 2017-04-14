import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import Tags from 'components/Tags';
// import Pagination from 'components/Pagination';

import { getTemplates } from 'reducers';

import { fetchTemplates } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchTemplates()),
})
@connect(state => ({
  ...state.pages.TemplateListPage,
  templates: getTemplates(state, state.pages.TemplateListPage.templates),
}))
export default class TemplateListPage extends React.Component {
  render() {
    const { templates = [] } = this.props;
    return (
      <div id="template-list-page">
        <H1>Templates</H1>
        <p>Select template to edit</p>
        <div id="templates-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'syntax', title: 'Syntax' },
              { key: 'locales', title: 'Locales' },
              { key: 'action', title: 'Action' },
            ]}
            data={templates.map(i => ({
              name: <div className={styles.name}>
                {i.title}
                <p>{i.description}</p>
              </div>,
              syntax: i.syntax,
              locales: <Tags tags={i.locales} formatter={i => i.locale} />,
              action: (<Button id={`edit-template-button-${i.name}`} theme="link" to={`templates/${i.id}`}>Edit&nbsp;Template</Button>),
            }))}
          />
          {
            // <div className={styles.pagination}>
            //   <Pagination
            //     count={20}
            //     current={5}
            //     formatter={v => `/apis?page=${v}`}
            //   />
            // </div>
          }
        </div>
      </div>
    );
  }
}
