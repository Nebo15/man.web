import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import TemplateListPage from 'containers/pages/TemplateListPage';
import TemplateEditPage from 'containers/pages/TemplateEditPage';

import NotFoundPage from 'containers/pages/NotFoundPage';


export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <Route path="templates" component={TemplateListPage} />
          <Route path="templates/:templateId" component={TemplateEditPage} />
          <IndexRedirect to="templates" />
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
