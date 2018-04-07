import React from 'react';
import { Route } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import DefaultPage from 'containers/pages/DefaultPage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/" component={DefaultPage} />
      </Route>
    </Route>
  );
};
