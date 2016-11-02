import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, useRouterHistory } from 'react-router';

import Introduction from './Introduction/Introduction';
import Visualisation from './Visualisation/Visualisation';

import 'normalize-css/normalize.css';
import './index.css';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/oorlogsslachtoffers',
});

const Root = () => {
  return (
    <Router history={ browserHistory } basename="/oorlogsslachtoffers/">
      <Route path="/" component={ Introduction } />
      <Route path="/visualisatie" component={ Visualisation } />
    </Router>
  );
}

render(<Root />, document.querySelector('#root'));
